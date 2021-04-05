module BinPacker

open Shared
open System
open BinPackerUtil
open BinPackerLogic

let runInner
    (sw: IStopwatch)
    (rootContainer: Container)
    (calculationMode: CalculationMode)
    (containers: Container list)
    (items: Item list)
    (T: float)
    (alpha: float)
    =
    try
        let itemsWithCost = { Items = items; Cost = 0. }

        let globalBest =
            (calc
                rootContainer
                calculationMode
                containers
                itemsWithCost
                {
                    ItemsPut = []
                    Cost = Double.MaxValue
                    ContainerSet = containers
                }
                T
                alpha
                []
                (sw.StartNew()))

        let itemsPut = globalBest.ItemsPut

        let volumeContainer =
            rootContainer.Dim.Height
            * rootContainer.Dim.Width
            * rootContainer.Dim.Length

        let itemsUnput = findUnfitItems itemsPut items
        let putVolume = itemsUnput |> List.sumBy calcVolume

        for item1 in itemsPut do
            for item2 in itemsPut do
                if item1.Item.Id <> item2.Item.Id
                   && Conflict.checkConflict item1 item2 then
                    printfn "Items conflc %A %A" item1 item2

        let res =
            {
                ItemsPut = itemsPut
                ContainerVol = volumeContainer
                ItemsUnput = itemsUnput
                PutVolume = int64 (putVolume)
                Container = rootContainer
                EmptyContainers = globalBest.ContainerSet
            }

        res
    with e ->
        printfn "%A" e
        reraise ()

let swap (a: _ []) x y =
    let tmp = a.[x]
    a.[x] <- a.[y]
    a.[y] <- tmp

// shuffle an array (in-place)
let shuffle a =
    Array.iteri (fun i _ -> swap a i (random.Next(i, Array.length a))) a
    a

let defaultBatchSize = 20


let runPerContainer
    (logger: ILogger)
    (sw: IStopwatch)
    (rootContainer: Container)
    (containerMode: ContainerMode)
    (calculationMode: CalculationMode)
    (items: Item list)
    (T: float)
    (alpha: float)
    =

    let rec loop
        (rootContainer: Container)
        (containers: Container list)
        (calculationMode: CalculationMode)
        (items: Item list)
        (results: CalcResult list)
        batchCount
        retryCount
        =
        let containerSort =
            match calculationMode with
            | MinimizeHeight -> (fun (c: Container) -> ((c.Coord.Y), -(c.Dim |> dimToVolume)))
            | MinimizeLength -> (fun c -> ((c.Coord.Z), -(c.Dim |> dimToVolume)))
            | MinimizeVolume -> (fun c -> ((0L), -(c.Dim |> dimToArea)))

        let containers = containers |> List.sortBy containerSort
        let oldBatchCount = batchCount

        // let batchCount =
        //     if (items.Length > 0 && items.Head.NoTop) then 1 else batchCount
        //let items = items |> Array.ofList |> shuffle |> List.ofArray
        let currentItems, remainingItems =
            if items.Length > batchCount then
                items |> List.splitAt batchCount
            else
                items, []

        let batchCount = oldBatchCount

        let res =
            runInner sw rootContainer calculationMode containers currentItems T alpha

        let rootContainer =
            { rootContainer with
                Weight =
                    rootContainer.Weight
                    - (res.ItemsPut
                       |> List.sumBy (fun s -> s.Item.Weight))
            }

        let lastunput = res.ItemsUnput

        let newItems =
            remainingItems
            @ (lastunput
               |> Array.ofList
               |> shuffle
               |> List.ofArray)

        let res = { res with ItemsUnput = [] }
        let results = res :: results

        let retryCount =
            if res.ItemsPut.IsEmpty then
                retryCount - 1
            else
                retryCount

        logger.Log
            "unput items :{@unput} - remaining:{@remaining} -batchCount:{@batchCount}"
            [|
                lastunput.Length
                remainingItems.Length
                batchCount
            |]

        let rbatchCount = Math.Max(1, (batchCount / 2))

        let duration =
            match containerMode with
            | MultiContainer -> 300000L
            | _ -> 90000L

        let timeOut =
            sw.ElapsedMilliseconds > duration
            || items
               |> List.forall (fun x -> x.Weight > rootContainer.Weight)
        //printfn "rbatchCount %i" rbatchCount
        match timeOut, newItems, retryCount with
        | false, _ :: _, 2
        | false, _ :: _, 3
        | false, _ :: _, 4 ->
            loop
                rootContainer
                (res.EmptyContainers |> mergeContainers)
                calculationMode
                newItems
                results
                rbatchCount
                retryCount
        | true, _, _
        | _, _, 0
        | _, _, -1
        | _, [], _ ->
            let itemsPut =
                (List.concat (results |> List.map (fun c -> c.ItemsPut)))
                |> List.distinct

            let res =
                {
                    Container = rootContainer
                    ContainerVol = rootContainer.Dim |> dimToVolume
                    EmptyContainers = res.EmptyContainers
                    ItemsPut = itemsPut
                    ItemsUnput = lastunput @ remainingItems
                    PutVolume =
                        itemsPut
                        |> List.map (fun x -> x.Item.Dim |> dimToVolume)
                        |> function
                        | [] -> 0L
                        | other -> other |> List.sum
                }

            res

        | _ ->
            loop
                rootContainer
                (res.EmptyContainers |> mergeContainers)
                calculationMode
                newItems
                results
                batchCount
                retryCount

    let rec outerLoop
        (calculationMode: CalculationMode)
        (containerMode: ContainerMode)
        (items: Item list)
        retryCount
        resList
        =

        let defaultBatchSize = if items.Length < 50 then 35 else 25

        let res =
            loop rootContainer [ rootContainer ] calculationMode (items) [] defaultBatchSize 6

        let res =
            match res.ItemsUnput with
            | [] ->
                let newRootContainer, max =
                    match calculationMode with
                    | MinimizeVolume
                    | MinimizeLength ->
                        let maxLength =
                            res.ItemsPut
                            |> List.map (fun x -> x.Item.Dim.Length + x.Coord.Z)
                            |> List.max

                        { rootContainer with
                            Dim =
                                { rootContainer.Dim with
                                    Length = maxLength
                                }
                        },
                        maxLength
                    | MinimizeHeight ->
                        let maxHeight =
                            res.ItemsPut
                            |> List.map (fun x -> x.Item.Dim.Height + x.Coord.Y)
                            |> List.max

                        { rootContainer with
                            Dim =
                                { rootContainer.Dim with
                                    Length = maxHeight
                                }
                        },
                        maxHeight

                let newRes =
                    loop newRootContainer [ rootContainer ] calculationMode (items) [] defaultBatchSize 6

                match newRes.ItemsUnput with
                | [] when max > 0L ->
                    let newContainer =
                        match calculationMode with
                        | MinimizeVolume
                        | MinimizeLength ->
                            ({
                                 Dim =
                                     {
                                         Width = rootContainer.Dim.Width
                                         Height = rootContainer.Dim.Height
                                         Length = rootContainer.Dim.Length - max
                                     }
                                 Coord = { X = 0L; Y = 0L; Z = max }
                                 Weight = 0
                             }: Container)
                        | CalculationMode.MinimizeHeight ->
                            ({
                                 Dim =
                                     {
                                         Width = rootContainer.Dim.Width
                                         Height = rootContainer.Dim.Height - max
                                         Length = rootContainer.Dim.Length
                                     }
                                 Coord = { X = 0L; Y = max; Z = 0L }
                                 Weight = 0
                             }: Container)

                    { newRes with
                        Container = rootContainer
                        ContainerVol = rootContainer.Dim |> dimToVolume
                        EmptyContainers =
                            (newContainer :: res.EmptyContainers)
                            |> mergeContainers
                    }
                | _ -> res
            | _ -> res

        let timeOut = sw.ElapsedMilliseconds > 90000L
        let results = res :: resList

        match timeOut, res.ItemsUnput, retryCount with
        | true, _, _
        | _, _, 0 -> results
        | _, [], _ -> results
        | _, _, _ ->
            let rec loopMutate items =
                function
                | 0 -> items
                | n -> loopMutate (items |> mutate calculationMode res.ItemsPut) (n - 1)

            let retryMode =
                match containerMode, calculationMode with
                | SingleContainer, MinimizeHeight -> MinimizeVolume
                | SingleContainer, MinimizeLength -> MinimizeVolume
                | _ -> calculationMode

            outerLoop (retryMode) containerMode (loopMutate items (items.Length / 10)) (retryCount - 1) results

    let retryCount =
        match containerMode with
        | MultiContainer -> 2
        | _ -> 10

    try
        let resList =
            outerLoop
                calculationMode
                containerMode
                (items
                 |> List.map (Rotate.rotateToMinZ calculationMode)
                 |> List.sortByDescending (fun x -> (x.KeepBottom, maxDim x)))

                retryCount
                []

        let res =
            resList |> List.maxBy (fun x -> x.PutVolume)

        logger.Log
            "Result Summary {@res}"
            [|
                {|
                    CalculationMode = calculationMode
                    ContainerMode = containerMode
                    PutItems = res.ItemsPut.Length
                    ItemsUnput = res.ItemsUnput.Length
                |}
            |]

        logger.Log "Result {@res}" [| { res with EmptyContainers = [] } |]

        let convertContainerToItemPut (container: Container) : ItemPut =
            {
                Coord = container.Coord
                Item =
                    {
                        Dim = container.Dim
                        Id = Guid.NewGuid().ToString()
                        Tag = sprintf "rgb(%i,%i,%i)" (random.Next(256)) (random.Next(256)) (random.Next(256))
                        NoTop = false
                        KeepTop = false
                        Rotation = false
                        KeepBottom = false
                        Weight = 0
                    }
            }
        //let res = {res with ItemsPut = res.EmptyContainers |> List.map convertContainerToItemPut}

        res
    with e ->
        logger.LogError e
        reraise ()

let bundleItems (item1: Item, item2: Item) =
    let w = item1.Dim.Width
    let h = item1.Dim.Height
    let l = item1.Dim.Length

    if w <= h && w <= l then
        { item1 with
            Dim =
                { item1.Dim with
                    Width = item1.Dim.Width * 2L
                }
        }
    elif l <= h && l <= w then
        { item1 with
            Dim =
                { item1.Dim with
                    Length = item1.Dim.Length * 2L
                }
        }
    else
        { item1 with
            Dim =
                { item1.Dim with
                    Height = item1.Dim.Height * 2L
                }
        }
//     { item1 with Width = item1.Width * 2L}

let toPairs (l: list<'a>) : list<'a * 'a> =
    let li = l |> List.mapi (fun i k -> (i, k))

    let evens, odds =
        li |> List.partition (fun (i, _) -> i % 2 = 0)

    let combined = evens |> List.zip odds

    combined
    |> List.map (fun ((i1, j1), (i2, j2)) -> (j1, j2))


let generate6Comb (item: Item) =
    [
        item
        item |> Rotate.rotateZ
        item |> Rotate.rotateY
        item |> Rotate.rotateY |> Rotate.rotateZ
        item |> Rotate.rotateX
        item |> Rotate.rotateX |> Rotate.rotateZ
    ]

let decide (rootContainer: Container) (item: Item) =
    if
        item.NoTop || item.KeepBottom || item.KeepTop
        || not (item.Rotation)
    then
        false
    else
        true

let twGroup (rootContainer: Container) (items: Item list) =
    match items with
    | [] -> []
    | head :: _ when (decide rootContainer head) |> not -> items
    | _ ->
        let chunks = items |> List.chunkBySize 10
        let rev = chunks |> List.rev

        match rev with
        | [] -> []
        | h :: [] -> h
        | h :: t ->
            let paired = t |> List.map toPairs

            let p : Item list =
                paired |> List.collect id |> List.map bundleItems

            p @ h

let splitAdjustedHeight (sample: Item) (item: ItemPut) =
    let hr =
        int (item.Item.Dim.Height / sample.Dim.Height)

    let items =
        [
            for i = 0 to (hr - 1) do
                {
                    Item = { item.Item with Dim = { item.Item.Dim with Height = item.Item.Dim.Height / int64(hr)}}
                    Coord =
                        { item.Coord with
                            Y =
                                item.Coord.Y
                                + item.Item.Dim.Height / int64 (hr) * int64 (i)
                        }
                }: ItemPut
        ]

    items

module SplitAdjust =

    let findAndAdjust (samples:Item list) (item: ItemPut) =
        let dim = item.Item.Dim
        let rec loop = function
            | [] -> failwith "not possible"

            | (head:Item) :: tail ->
                if dim.Height % head.Dim.Height = 0L  && dim.Width % head.Dim.Width = 0L && dim.Length % head.Dim.Length = 0L then
                    head
                else
                    loop tail
        loop  samples

    let splitAdjustedWidth (sample: Item) (item: ItemPut) =
        let hr =
            int (item.Item.Dim.Width / sample.Dim.Width)

        let items =
            [
                for i = 0 to (hr - 1) do
                    {
                        Item = { item.Item with Dim = { item.Item.Dim with Width = item.Item.Dim.Width / int64(hr)}}
                        Coord =
                            { item.Coord with
                                X =
                                    item.Coord.X
                                    + item.Item.Dim.Width / int64 (hr) * int64 (i)
                            }
                    }: ItemPut
            ]

        items

    let splitAdjustedLength (sample: Item) (item: ItemPut) =
        let hr =
            int (item.Item.Dim.Length / sample.Dim.Length)

        let items =
            [
                for i = 0 to (hr - 1) do
                    {
                        Item = { item.Item with Dim = { item.Item.Dim with Length = item.Item.Dim.Length / int64(hr)}}
                        Coord =
                            { item.Coord with
                                Z =
                                    item.Coord.Z
                                    + item.Item.Dim.Length / int64 (hr) * int64 (i)
                            }
                    }: ItemPut
            ]

        items

    let splitAdjusted (item: ItemPut, sample: Item) =
        (item)
        |> (splitAdjustedHeight sample)
        |> List.map (splitAdjustedLength sample)
        |> List.collect id
        |> List.map (splitAdjustedWidth sample)
        |> List.collect id

let groupItems (rootContainer: Container) (items: Item list) (map: Map<_, _>) =



    let itemGroups =
        items |> List.groupBy (fun x -> (x.Tag, x.Dim))

    let rec buildMap groups (map: Map<string, Item list>) =
        match groups with
        | [] -> map
        | ((tag: string, _), ((head: Item) :: _)) :: tail ->
            let map =
                map |> Map.add tag (head |> generate6Comb)

            buildMap tail map
        | _ -> failwith "cannot happen"

    let map = buildMap itemGroups map

    (itemGroups
     |> List.map (fun (_, g) -> twGroup rootContainer g)
     |> List.collect id),
    map
//     let smallParts, bigParts = itemGroups |> List.partition (fun (s,g) -> g.Length < 20)

let run
    (sw: IStopwatch)
    (logger: ILogger)
    (rootContainer: Container)
    (containerMode: ContainerMode)
    (calculationMode: CalculationMode)
    (items: Item list)
    (T: float)
    (alpha: float)
    =
    let rec loopGroup items prevItems map =

        if items = prevItems then
            items, map
        else
            let newItems, newMap = groupItems rootContainer items map
            loopGroup newItems items newMap

    let items, map = loopGroup items [] Map.empty

    let rec loop results unputItems =
        let res =
            runPerContainer logger sw rootContainer containerMode calculationMode unputItems T alpha

        let res =
            match res.ItemsUnput with
            | [] ->
                let newRootContainer, max =
                    match calculationMode with
                    | MinimizeVolume
                    | MinimizeLength ->
                        let maxLength =
                            res.ItemsPut
                            |> List.map (fun x -> x.Item.Dim.Length + x.Coord.Z)
                            |> List.max

                        { rootContainer with
                            Dim =
                                { rootContainer.Dim with
                                    Length = maxLength
                                }
                        },
                        maxLength
                    | MinimizeHeight ->
                        let maxHeight =
                            res.ItemsPut
                            |> List.map (fun x -> x.Item.Dim.Height + x.Coord.Y)
                            |> List.max

                        { rootContainer with
                            Dim =
                                { rootContainer.Dim with
                                    Height = maxHeight
                                }
                        },
                        maxHeight

                if max = 0L then
                    res
                else
                    let newRes =
                        runPerContainer logger sw newRootContainer containerMode calculationMode unputItems T alpha

                    match newRes.ItemsUnput with
                    | [] ->
                        { newRes with
                            Container = rootContainer
                            ContainerVol = rootContainer.Dim |> dimToVolume
                        }
                    | _ -> res
            | _ -> res

        let sumRes = res :: results

        match containerMode with
        | SingleContainer -> sumRes
        | _ ->
            if sumRes.Length > 20 then
                sumRes
            else
                match res.ItemsUnput with
                | [] -> sumRes
                | unput when unput.Length = unputItems.Length -> sumRes
                | _ -> loop sumRes res.ItemsUnput

    let finalResults = (loop [] items) |> List.rev

    [
        for finalResult in finalResults do
            let itemsPut =
                [ for itemPut in finalResult.ItemsPut do
                    let samples = map.[itemPut.Item.Tag]
                    let adjusted = SplitAdjust.findAndAdjust samples itemPut
                    yield! SplitAdjust.splitAdjusted(itemPut, adjusted)

                ]
            {finalResult with ItemsPut = itemsPut}
    ]

