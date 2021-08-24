module BinPackerLogic
open BinPackerUtil
open Shared
open System

let rec putItem (rootContainer: Container) (calculationMode: CalculationMode) tryCount firstLevelRetry: PutItem =
    fun container item (weightPut: int) ->
        let remainingWidth = container.Dim.Width - item.Dim.Width
        let remainingHeight = container.Dim.Height - item.Dim.Height
        let remainingLength = container.Dim.Length - item.Dim.Length
        let minVolumeMode = match calculationMode with | MinimizeVolume -> true | _ -> false

        let rotateForMinWidth item : Item =
            if remainingWidth <> 0L then
                let newItem = item |> Rotate.rotateZ
                if newItem.Dim.Width <> container.Dim.Width then
                    let newItem = item |> Rotate.rotateY
                    if newItem.Dim.Width <> container.Dim.Width then
                        item
                    else
                        newItem
                else
                    newItem
            else
                item

        let rotateForMinHeight item =
            if remainingHeight<> 0L then
                let newItem = item |> Rotate.rotateZ
                if newItem.Dim.Height <> container.Dim.Height then
                    let newItem = item |> Rotate.rotateX
                    if newItem.Dim.Height <> container.Dim.Height then
                        item
                    else
                        newItem
                else
                    newItem
            else
                item

        let rotateForMinLength item =
            if remainingLength<> 0L then
                let newItem = item |> Rotate.rotateY
                if newItem.Dim.Length <> container.Dim.Length then
                    let newItem = item |> Rotate.rotateX
                    if newItem.Dim.Length <> container.Dim.Length then
                        item
                    else
                        newItem
                else
                    newItem
            else
                item





        // if minVolumeMode && remainingHeight > 0L && remainingWidth > 0L  && remainingLength > 0L && firstLevelRetry > 0 then
        //             let item = item |> rotateForMinHeight |> rotateForMinWidth |> rotateForMinLength
        //             putItem rootContainer calculationMode (tryCount) (firstLevelRetry - 1) container item weightPut

        // else
        let remainingWeight =
            rootContainer.Weight - weightPut - item.Weight

        if remainingWeight < 0 then
            ValueSome([ [ container ] ], ValueNone)
        elif item.NoTop
             && container.Coord.Y + container.Dim.Height < rootContainer.Dim.Height then
            ValueNone
        elif item.KeepBottom && container.Coord.Y > 0L then
            ValueNone
        elif (remainingHeight < 0L)
             || remainingLength < 0L
             || remainingWidth < 0L then
            if tryCount > 0 then
                if tryCount = 3 then
                    let item = item |> Rotate.rotateZ

                    putItem rootContainer calculationMode (tryCount - 1) 0 container item weightPut
                else if tryCount = 2 then
                    let item = item |> Rotate.rotateZ |> Rotate.rotateY

                    putItem rootContainer calculationMode (tryCount - 1) 0 container item weightPut
                else
                    let item = item |> Rotate.rotateY |> Rotate.rotateX

                    putItem rootContainer calculationMode (tryCount - 1) 0 container item weightPut
            else
                ValueNone
        else
            let calculationMode =
                if item.NoTop then
                    CalculationMode.MinimizeHeight
                else
                    calculationMode

            let containerSort =
                match calculationMode with
                | MinimizeVolume -> fun (s: Container) -> -(s.Dim |> dimToArea)
                | MinimizeHeight -> (fun (s: Container) -> s.Coord.Y)
                | MinimizeLength -> (fun s -> s.Coord.Z)

            let noTopFilter (s: Container) =
                (item.NoTop
                 && s.Coord.Y = container.Coord.Y + item.Dim.Height
                 && s.Coord.X = container.Coord.X
                 && s.Coord.Z = container.Coord.Z)
                |> not

            let config1, config2, config3, config4 =
                match calculationMode with
                | CalculationMode.MinimizeLength ->
                    let config1 =
                        let topBlock =
                            {
                                Dim =
                                    {
                                        Width = container.Dim.Width
                                        Height = remainingHeight
                                        Length = item.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y + item.Dim.Height
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let sideBlock =
                            {
                                Dim =
                                    {
                                        Width = remainingWidth
                                        Height = item.Dim.Height
                                        Length = item.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X + item.Dim.Width
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let remainingBlock =
                            {
                                Dim =
                                    {
                                        Width = container.Dim.Width
                                        Height = container.Dim.Height
                                        Length = remainingLength
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z + item.Dim.Length
                                    }
                                Weight = 0
                            }

                        [ topBlock; sideBlock; remainingBlock ]
                        |> List.filter
                            (fun s ->
                                s.Dim.Width > 0L
                                && s.Dim.Height > 0L
                                && s.Dim.Length > 0L)
                        |> List.filter noTopFilter
                        |> List.sortBy containerSort

                    let config2 =

                        let topBlock =
                            {
                                Dim =
                                    {
                                        Width = item.Dim.Width
                                        Height = remainingHeight
                                        Length = item.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y + item.Dim.Height
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let sideBlock =
                            {
                                Dim =
                                    {
                                        Width = remainingWidth
                                        Height = container.Dim.Height
                                        Length = item.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X + item.Dim.Width
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let remainingBlock =
                            {
                                Dim =
                                    {
                                        Width = container.Dim.Width
                                        Height = container.Dim.Height
                                        Length = remainingLength
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z + item.Dim.Length
                                    }
                                Weight = 0
                            }

                        [ topBlock; sideBlock; remainingBlock ]
                        |> List.filter
                            (fun s ->
                                s.Dim.Width > 0L
                                && s.Dim.Height > 0L
                                && s.Dim.Length > 0L)
                        |> List.filter noTopFilter
                        |> List.sortBy containerSort

                    let config3 =
                        let topBlock =
                            {
                                Dim =
                                    {
                                        Width = container.Dim.Width
                                        Height = remainingHeight
                                        Length = container.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y + item.Dim.Height
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let sideBlock =
                            {
                                Dim =
                                    {
                                        Width = remainingWidth
                                        Height = item.Dim.Height
                                        Length = container.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X + item.Dim.Width
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let remainingBlock =
                            {
                                Dim =
                                    {
                                        Width = item.Dim.Width
                                        Height = item.Dim.Height
                                        Length = remainingLength
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z + item.Dim.Length
                                    }
                                Weight = 0
                            }

                        [ topBlock; sideBlock; remainingBlock ]
                        |> List.filter
                            (fun s ->
                                s.Dim.Width > 0L
                                && s.Dim.Height > 0L
                                && s.Dim.Length > 0L)
                        |> List.filter noTopFilter
                        |> List.sortBy containerSort

                    let config4 =
                        let topBlock =
                            {
                                Dim =
                                    {
                                        Width = item.Dim.Width
                                        Height = remainingHeight
                                        Length = container.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y + item.Dim.Height
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let sideBlock =
                            {
                                Dim =
                                    {
                                        Width = remainingWidth
                                        Height = container.Dim.Height
                                        Length = container.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X + item.Dim.Width
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let remainingBlock =
                            {
                                Dim =
                                    {
                                        Width = item.Dim.Width
                                        Height = item.Dim.Height
                                        Length = remainingLength
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z + item.Dim.Length
                                    }
                                Weight = 0
                            }

                        [ topBlock; sideBlock; remainingBlock ]
                        |> List.filter
                            (fun s ->
                                s.Dim.Width > 0L
                                && s.Dim.Height > 0L
                                && s.Dim.Length > 0L)
                        |> List.filter noTopFilter
                        |> List.sortBy containerSort

                    config1, config2, config3, config4
                | _ ->
                    let config1 =
                        let topBlock =
                            {
                                Dim =
                                    {
                                        Width = container.Dim.Width
                                        Height = item.Dim.Height
                                        Length = remainingLength
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z + item.Dim.Length
                                    }
                                Weight = 0
                            }

                        let sideBlock =
                            {
                                Dim =
                                    {
                                        Width = remainingWidth
                                        Height = item.Dim.Height
                                        Length = item.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X + item.Dim.Width
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let remainingBlock =
                            {
                                Dim =
                                    {
                                        Width = container.Dim.Width
                                        Height = remainingHeight
                                        Length = container.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y + item.Dim.Height
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        [ topBlock; sideBlock; remainingBlock ]
                        |> List.filter
                            (fun s ->
                                s.Dim.Width > 0L
                                && s.Dim.Height > 0L
                                && s.Dim.Length > 0L)
                        |> List.filter noTopFilter
                        |> List.sortBy containerSort

                    let config2 =

                        let topBlock =
                            {
                                Dim =
                                    {
                                        Width = item.Dim.Width
                                        Height = item.Dim.Height
                                        Length = remainingLength
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z + item.Dim.Length
                                    }
                                Weight = 0
                            }

                        let sideBlock =
                            {
                                Dim =
                                    {
                                        Width = remainingWidth
                                        Height = item.Dim.Height
                                        Length = container.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X + item.Dim.Width
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let remainingBlock =
                            {
                                Dim =
                                    {
                                        Width = container.Dim.Width
                                        Height = remainingHeight
                                        Length = container.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y + item.Dim.Height
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        [ topBlock; sideBlock; remainingBlock ]
                        |> List.filter
                            (fun s ->
                                s.Dim.Width > 0L
                                && s.Dim.Height > 0L
                                && s.Dim.Length > 0L)
                        |> List.filter noTopFilter
                        |> List.sortBy containerSort

                    let config3 =
                        let topBlock =
                            {
                                Dim =
                                    {
                                        Width = container.Dim.Width
                                        Height = container.Dim.Height
                                        Length = remainingLength
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z + item.Dim.Length
                                    }
                                Weight = 0
                            }

                        let sideBlock =
                            {
                                Dim =
                                    {
                                        Width = remainingWidth
                                        Height = container.Dim.Height
                                        Length = item.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X + item.Dim.Width
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let remainingBlock =
                            {
                                Dim =
                                    {
                                        Width = item.Dim.Width
                                        Height = remainingHeight
                                        Length = item.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y + item.Dim.Height
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        [ topBlock; sideBlock; remainingBlock ]
                        |> List.filter
                            (fun s ->
                                s.Dim.Width > 0L
                                && s.Dim.Height > 0L
                                && s.Dim.Length > 0L)
                        |> List.filter noTopFilter
                        |> List.sortBy containerSort

                    let config4 =
                        let topBlock =
                            {
                                Dim =
                                    {
                                        Width = item.Dim.Width
                                        Height = container.Dim.Height
                                        Length = remainingLength
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z + item.Dim.Length
                                    }
                                Weight = 0
                            }

                        let sideBlock =
                            {
                                Dim =
                                    {
                                        Width = remainingWidth
                                        Height = container.Dim.Height
                                        Length = container.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X + item.Dim.Width
                                        Y = container.Coord.Y
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        let remainingBlock =
                            {
                                Dim =
                                    {
                                        Width = item.Dim.Width
                                        Height = remainingHeight
                                        Length = item.Dim.Length
                                    }
                                Coord =
                                    {
                                        X = container.Coord.X
                                        Y = container.Coord.Y + item.Dim.Height
                                        Z = container.Coord.Z
                                    }
                                Weight = 0
                            }

                        [ topBlock; sideBlock; remainingBlock ]
                        |> List.filter
                            (fun s ->
                                s.Dim.Width > 0L
                                && s.Dim.Height > 0L
                                && s.Dim.Length > 0L)
                        |> List.filter noTopFilter
                        |> List.sortBy containerSort

                    config1, config2, config3, config4


            let itemPut =
                {
                    Item = item
                    Coord =
                        {
                            X = container.Coord.X
                            Y = container.Coord.Y
                            Z = container.Coord.Z
                        }
                }

            let all =
                match calculationMode with
                | MinimizeVolume
                | MinimizeLength ->
                    [ config2; config1; config3; config4 ]
                    |> List.distinct
                | MinimizeHeight ->
                    [ config3; config4; config2; config1 ]
                    |> List.distinct

            let t1 =
                all |> List.item (random.Next(0, all.Length))

            let t2 =
                all
                |> function
                | [] -> []
                | [ s ] -> s
                | _ ->
                    all
                    |> List.filter (fun e -> e <> t1)
                    |> fun l -> List.item (random.Next(0, l.Length)) l

            let sets =
                if item.NoTop then
                    match calculationMode with
                    | CalculationMode.MinimizeLength -> [ config2; config1 ]
                    | _ -> [ config3; config4 ]
                else
                    [ t1; t2 ]

            let res =
                ValueSome(
                    struct (all
                            |> List.distinct
                            |> List.filter (fun f -> f |> List.isEmpty |> not)
                            |> List.sortBy (containerNestedSort calculationMode),
                            ValueSome itemPut)
                )

            res



let calculateCost (calculationMode: CalculationMode) =
    fun putItem containers items ->
        let rec loop =
            function
            | struct (containerSet, [], itemPuts) :: _, _, _ -> ValueSome(containerSet, itemPuts)
            | struct (containerSet, item :: remainingItems, itemPuts) :: remainingStack, counter, _ when counter > 0 ->
                let containerSet = containerSet |> mergeContainers

                let rec loopContainers: (struct (Container list * Container list)) -> StackItem list =
                    function
                    | (container :: remainingContainers) as cs, triedButNotFit ->

                        match (putItem container item (itemPuts |> List.sumBy (fun x -> x.Item.Weight))) with
                        | ValueSome (struct (containerTriplets, (itemPut: ItemPut ValueOption))) ->
                            let firstRes: StackItem list =
                                [
                                    let newItems =
                                        match itemPut with
                                        | ValueNone -> itemPuts
                                        | ValueSome i -> i :: itemPuts


                                    match containerTriplets with
                                    | [] ->
                                        yield
                                            ((remainingContainers @ triedButNotFit
                                              |> mergeContainers),
                                             remainingItems,
                                             newItems)
                                    | _ ->
                                        for triplet in containerTriplets do
                                            let rema =
                                                (remainingContainers @ triplet @ triedButNotFit)
                                                |> mergeContainers //|> List.tail //|> mergeContainers
                                            // checkConflictI newItems
                                            let containerSort =
                                                match calculationMode with
                                                | MinimizeHeight ->
                                                    (fun (s: Container) -> (s.Coord.Y, -(s.Dim |> dimToVolume)))
                                                | MinimizeLength -> (fun s -> (s.Coord.Z, -(s.Dim |> dimToVolume)))
                                                | MinimizeVolume -> (fun s -> (0L, -(s.Dim |> dimToArea)))

                                            yield (rema |> List.sortBy containerSort, remainingItems, newItems)
                                ]

                            firstRes

                        | _ -> loopContainers (remainingContainers, container :: triedButNotFit)
                    | _ -> []

                let containerSort =
                    match calculationMode with
                    | MinimizeVolume -> (fun (s: Container) -> s.Dim |> dimToArea)
                    | MinimizeHeight -> (fun (s: Container) -> s.Coord.Y)
                    | MinimizeLength -> (fun s -> s.Coord.Z)

                let sorted =
                    (containerSet |> List.sortBy containerSort)

                let stackItems = loopContainers (sorted, [])
                let totalStack = (stackItems @ remainingStack)

                loop (totalStack, counter - 1, itemPuts)

            | (cs, _, itemPuts) :: _, _, _ -> ValueSome(cs, itemPuts)
            | [(cs, _, itemPuts)] , _, _ -> ValueSome(cs, itemPuts)
            | _, _, itemPuts -> ValueSome([], itemPuts)

        loop ([ containers, items, [] ], 10000, [])

let calcVolume (item: Item) =
    float (item.Dim.Width)
    * float (item.Dim.Height)
    * float (item.Dim.Length)

let maxDim (item: Item) =
    Math.Max(item.Dim.Width, Math.Max(item.Dim.Height, item.Dim.Length))

let maxVol (item: Item) =
    item.Dim.Width * item.Dim.Height * item.Dim.Length

let inline mutate (calcMode: CalculationMode) (itemsPut: ItemPut list) (items: Item list) =
    if items |> List.isEmpty then
        []
    else
        let firstSwap =
            if random.NextDouble() > 0.6
               || itemsPut |> List.isEmpty then
                random.Next(0, items.Length)
            else
                let max =
                    match calcMode with
                    | MinimizeVolume
                    | MinimizeLength -> (fun x -> x.Coord.Z)
                    | MinimizeHeight -> (fun x -> x.Coord.Y)

                let maxId = itemsPut |> List.maxBy max

                items
                |> List.findIndex (fun x -> x.Id = maxId.Item.Id)

        let secondSwap = random.Next(0, items.Length)
        let arr = items |> Array.ofList
        let tmp = arr.[firstSwap] |> Rotate.randomRotate
        arr.[firstSwap] <- arr.[secondSwap]
        arr.[secondSwap] <- tmp
        arr |> List.ofArray

let TMin = 1.

open System
open System.Diagnostics

let inline findUnfitItems itemsPut (items: Item list) =
    let itemsPutIds =
        itemsPut |> List.map (fun d -> d.Item.Id)

    items
    |> List.filter (fun i -> itemsPutIds |> List.contains i.Id |> not)


let calcCost rootContainer (calculationMode: CalculationMode) containers items =
    match calculateCost
              calculationMode
              (putItem rootContainer calculationMode 3 3)
              containers
              (items |> List.sortByDescending calcVolume) with
    | ValueSome (cs, res) ->
        let cs = (cs |> mergeContainers)
        let unfitItems = findUnfitItems res items
        let totalArea =
            match calculationMode with
            | MinimizeVolume ->
                SurfaceCalc.calculateSurfaceArea res rootContainer
            | _ -> 0L
        let sumZ: Int64 =
            if res.Length = 0 then
                Int64.MaxValue
            else
                match calculationMode with
                | MinimizeHeight ->
                    (res
                     |> List.sumBy (fun x -> x.Coord.Y + x.Item.Dim.Height))
                | MinimizeVolume -> 0L
                | MinimizeLength ->
                    (res
                     |> List.sumBy (fun x -> x.Coord.Z + x.Item.Dim.Length))

        let maxZCoord =
            if res.Length = 0 then
                Int64.MaxValue
            else
                match calculationMode with
                | MinimizeHeight ->
                    (res
                     |> List.maxBy (fun x -> x.Coord.Y + x.Item.Dim.Height))
                    |> fun max -> max.Item.Dim.Height + max.Coord.Y
                | MinimizeVolume -> 0L
                | MinimizeLength ->
                    (res
                     |> List.maxBy (fun x -> x.Coord.Z + x.Item.Dim.Length))
                    |> fun max -> max.Item.Dim.Length + max.Coord.Z

        float
            ((unfitItems |> List.sumBy calcVolume) * 10.
             // + 1000. * float (cs |> List.sumBy(fun x->x.Dim |> dimToArea))
             + 5. * float(totalArea)
             + 1. * float (sumZ)
             + 1.0 * float (maxZCoord)),
        res,
        cs
    | ValueNone _ -> Double.MaxValue, [], []

type GlobalBest =
    {
        ItemsPut: ItemPut list
        Cost: float
        ContainerSet: Container list
    }

let rec calc
    (rootContainer: Container)
    (calculationMode: CalculationMode)
    (containers: Container list)
    (itemsWithCost: ItemsWithCost)
    (globalBest: GlobalBest)
    (T: float)
    (alpha: float)
    result
    (sw: IStopwatch)
    =
    if TMin >= T
       || sw.ElapsedMilliseconds > 8000L
       || (itemsWithCost.Items.Length = 1
           && globalBest.ItemsPut.Length = 1) then
        globalBest
    else
        let items = itemsWithCost.Items

        let calculated, res, globalBest =
            if itemsWithCost.Cost = 0. then
                let cost, res, cs =
                    calcCost rootContainer calculationMode containers items

                { itemsWithCost with Cost = cost },
                res,
                {
                    ItemsPut = res
                    Cost = cost
                    ContainerSet = cs
                }
            else
                itemsWithCost, result, globalBest

        let rec loop (itemsWC: ItemsWithCost, res) (globalBest: GlobalBest) count =
            if count = 0 then
                itemsWC, res, globalBest
            else
                let items = itemsWC.Items
                let mutate = mutate calculationMode

                let nbr =
                    items
                    |> mutate res
                    |> mutate res
                    |> mutate res
                    |> mutate res
                    |> mutate res

                let nbrCost, nbrRes, cs =
                    calcCost rootContainer calculationMode containers nbr


                let nextItem, res, globalBest2 =
                    //printfn "costs: %f-%f" calculated.Cost nbrCost
                    if nbrCost < calculated.Cost then
                        { Items = nbr; Cost = nbrCost },
                        nbrRes,
                        (if nbrCost < globalBest.Cost then
                             {
                                 ItemsPut = nbrRes
                                 Cost = nbrCost
                                 ContainerSet = cs
                             }
                         else
                             globalBest)
                    else
                        let diff = (calculated.Cost - nbrCost)
                        let exp = Math.Exp(diff / T)

                        if exp < 1.0 && exp > random.NextDouble() then
                            { Items = nbr; Cost = nbrCost }, nbrRes, globalBest
                        else
                            {
                                Items = items
                                Cost = calculated.Cost
                            },
                            res,
                            globalBest

                loop (nextItem, res) globalBest2 (count - 1)
        if TMin >= T
           || sw.ElapsedMilliseconds > 8000L
           || (itemsWithCost.Items.Length = 1
               && globalBest.ItemsPut.Length = 1) then
            globalBest
        else
            let c, r, globalBest = loop (calculated, res) globalBest 5
            calc rootContainer calculationMode containers c globalBest (T * alpha) alpha r sw
