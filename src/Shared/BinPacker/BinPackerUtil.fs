module BinPackerUtil

open Shared
open System

let random = System.Random()

module Rotate =
    let inline rotateZ (item: Item) =
        if item.KeepTop || not (item.Rotation) then
            item
        else

            { item with
                Dim =
                    {
                        Height = item.Dim.Width
                        Width = item.Dim.Height
                        Length = item.Dim.Length
                    }
            }

    let inline rotateY (item: Item) =
        if  not (item.Rotation) then
            item
        else
        { item with
            Dim =
                {
                    Height = item.Dim.Height
                    Width = item.Dim.Length
                    Length = item.Dim.Width
                }
        }

    let inline rotateX (item: Item) =
        if item.KeepTop || not (item.Rotation) then
            item
        else
            { item with
                Dim =
                    {
                        Height = item.Dim.Length
                        Width = item.Dim.Width
                        Length = item.Dim.Height
                    }
            }

    let rotateToMinZ calculationMode item =
        let comb =
            let x = item |> rotateX
            let y = item |> rotateY
            let z = item |> rotateZ
            [ item; x; y; z ]

        match calculationMode with
        | MinimizeHeight -> comb |> List.minBy (fun d -> d.Dim.Height)
        | MinimizeLength -> comb |> List.minBy (fun d -> d.Dim.Length)
        | MinimizeVolume -> comb |> List.minBy (fun d -> d.Dim.Length)


    let inline randomRotate item: Item =
        let r = random.NextDouble()

        if r < 0.333 then rotateZ item
        elif r < 0.666 then rotateY item
        else rotateX item

module SurfaceCalc =
    type SurfaceType =
        | X
        | Y
        | Z

    type Surface =
        {
            Coord: Coordinates
            Width: Int64
            Height: Int64
        }

    let zSurfaces (itemPut: ItemPut) (rootContainer: Container) =
        [
            {
                Coord = itemPut.Coord
                Width = itemPut.Item.Dim.Width
                Height = itemPut.Item.Dim.Height
            }
            {
                Coord =
                    { itemPut.Coord with
                        Z = itemPut.Item.Dim.Length + itemPut.Coord.Z
                    }
                Width = itemPut.Item.Dim.Width
                Height = itemPut.Item.Dim.Height

            }
        ]
        |> List.filter
            (fun s ->
                s.Coord.Z <> 0L
                && s.Coord.Z <> rootContainer.Dim.Length)

    let xSurfaces (itemPut: ItemPut) (rootContainer: Container) =
        [
            {
                Coord = itemPut.Coord
                Width = itemPut.Item.Dim.Length
                Height = itemPut.Item.Dim.Height
            }
            {
                Coord =
                    { itemPut.Coord with
                        X = itemPut.Item.Dim.Width + itemPut.Coord.X
                    }
                Width = itemPut.Item.Dim.Length
                Height = itemPut.Item.Dim.Height
            }
        ]
        |> List.filter
            (fun s ->
                s.Coord.X <> 0L
                && s.Coord.X <> rootContainer.Dim.Width)

    let ySurfaces (itemPut: ItemPut) (rootContainer: Container) =
        [
            {
                Coord = itemPut.Coord
                Width = itemPut.Item.Dim.Width
                Height = itemPut.Item.Dim.Length
            }
            {
                Coord =
                    { itemPut.Coord with
                        Y = itemPut.Item.Dim.Height + itemPut.Coord.Y
                    }
                Width = itemPut.Item.Dim.Length
                Height = itemPut.Item.Dim.Width
            }
        ]
        |> List.filter
            (fun s ->
                s.Coord.Y <> 0L
                && s.Coord.Y <> rootContainer.Dim.Height)

    let allXSurfaces (items: ItemPut list) (root: Container) =
        items
        |> List.map (fun i -> xSurfaces i root)
        |> List.collect id

    let allYSurfaces (items: ItemPut list) (root: Container) =
        items
        |> List.map (fun i -> ySurfaces i root)
        |> List.collect id

    let allZSurfaces (items: ItemPut list) (root: Container) =
        items
        |> List.map (fun i -> zSurfaces i root)
        |> List.collect id

    let mostlyIntersects (xa1: int64, ya1: int64, xa2: int64, ya2: int64, xb1, yb1, xb2, yb2) =
        let iLeft = Math.Max(xa1, xb1)
        let iRight = Math.Min(xa2, xb2)
        let iTop = Math.Min(ya1, yb1)
        let iBottom = Math.Max(ya2, yb2)
        Math.Max(0L, iRight - iLeft)
            * Math.Max(0L, iTop - iBottom)



    let intersections (st: SurfaceType) ((s1: Surface), (s2: Surface)): Int64 =
        match st with
        | Z ->
            if (s1.Coord.Z <> s2.Coord.Z) then
                0L
            else
                mostlyIntersects (
                    s1.Coord.X,
                    s1.Coord.Y + s1.Height,
                    s1.Coord.X + s1.Width,
                    s1.Coord.Y,
                    s2.Coord.X,
                    s2.Coord.Y + s2.Height,
                    s2.Coord.X + s2.Width,
                    s2.Coord.Y
                )
        | Y ->
            if (s1.Coord.Y <> s2.Coord.Y) then
                0L
            else
                mostlyIntersects (
                    s1.Coord.X,
                    s1.Coord.Z + s1.Height,
                    s1.Coord.X + s1.Width,
                    s1.Coord.Z,
                    s2.Coord.X,
                    s2.Coord.Z + s2.Height,
                    s2.Coord.X + s2.Width,
                    s2.Coord.Z
                )

        | X ->
            if (s1.Coord.Z <> s2.Coord.Z) then
                0L
            else
                mostlyIntersects (
                    s1.Coord.Z,
                    s1.Coord.Y + s1.Height,
                    s1.Coord.Z + s1.Width,
                    s1.Coord.Y,
                    s2.Coord.Z,
                    s2.Coord.Y + s2.Height,
                    s2.Coord.Z + s2.Width,
                    s2.Coord.Y
                )


    let generatePairs (surfaces: Surface list): ((Surface * Surface) list) =
        [
            for x in surfaces |> List.indexed do
                for y in surfaces |> List.indexed do
                    if x <> y then
                        (x|> snd, y |> snd)
        ]
        |> List.distinctBy (fun (x, y) -> (y, x))

    let calculateSurfaceArea (items: ItemPut list) (root: Container) =
        let xSurfaces = allXSurfaces items root
        let ySurfaces = allYSurfaces items root
        let zSurfaces = allZSurfaces items root

        let xInt =
            List.sumBy (intersections X) (xSurfaces |> generatePairs)

        let xSum =
            xSurfaces
            |> List.sumBy (fun s -> s.Width * s.Height)

        let xA = xSum - (2L * xInt)

        let yInt =
            List.sumBy (intersections Y) (ySurfaces |> generatePairs)

        let ySum =
            xSurfaces
            |> List.sumBy (fun s -> s.Width * s.Height)

        let yA = ySum - (2L * yInt)
        let zPairs = (zSurfaces |> generatePairs)

        let zInt =
            List.sumBy (intersections Z) zPairs

        let zSum =
            zSurfaces
            |> List.sumBy (fun s -> s.Width * s.Height)

        let zA = zSum - (2L * zInt)
        xA + yA + zA

let dimToVolume (d: Dim) = d.Width * d.Height * d.Length

let dimToArea (d: Dim) =
    d.Width * d.Height
    + (d.Length * d.Width)
    + (d.Length * d.Height)

module Conflict =
    let checkConflictC (A: Container) (B: Container) =
        not (
            B.Coord.X >= A.Coord.X + A.Dim.Width
            || B.Coord.X + B.Dim.Width <= A.Coord.X
            || B.Coord.Y >= A.Coord.Y + A.Dim.Height
            || B.Coord.Y + B.Dim.Height <= A.Coord.Y
            || B.Coord.Z >= A.Coord.Z + A.Dim.Length
            || B.Coord.Z + B.Dim.Length <= A.Coord.Z
        )

    let containerssCheck (containers: Container list) =
        for item1 in containers do
            for item2 in containers do
                if item1 <> item2 && checkConflictC item1 item2 then
                    printfn "contianer conflc %A %A" item1 item2
                    failwith "conf"

    let checkConflict (A: ItemPut) (B: ItemPut) =
        not (
            B.Coord.X >= A.Coord.X + A.Item.Dim.Width
            || B.Coord.X + B.Item.Dim.Width <= A.Coord.X
            || B.Coord.Y >= A.Coord.Y + A.Item.Dim.Height
            || B.Coord.Y + B.Item.Dim.Height <= A.Coord.Y
            || B.Coord.Z >= A.Coord.Z + A.Item.Dim.Length
            || B.Coord.Z + B.Item.Dim.Length <= A.Coord.Z
        )

let mergeContainers (containers: Container list) =
    let containers = containers |> List.indexed

    let mergersZ containers =
        seq {
            for (i1, c1: Container) in containers do
                for (i2, c2) in containers do
                    if (i1 <> i2) then
                        if c1.Coord.X = c2.Coord.X
                           && c1.Coord.Y = c2.Coord.Y
                           && c1.Dim.Width = c2.Dim.Width
                           && c2.Dim.Height = c1.Dim.Height
                           && c2.Coord.Z = c1.Coord.Z + c1.Dim.Length then
                            ((i1, c1), (i2, c2))
        }



    let mergeContainersZ (c1: Container) (c2: Container) =
        {
            Dim =
                {
                    Width = c1.Dim.Width
                    Height = c1.Dim.Height
                    Length = c1.Dim.Length + c2.Dim.Length
                }
            Weight = c1.Weight + c2.Weight
            Coord = c1.Coord
        }

    let mergersY containers =
        seq {
            for (i1, c1: Container) in containers do
                for (i2, c2) in containers do
                    if (i1 <> i2) then
                        if c1.Coord.X = c2.Coord.X
                           && c1.Coord.Z = c2.Coord.Z
                           && c1.Dim.Length = c2.Dim.Length
                           && c2.Dim.Width = c1.Dim.Width
                           && c2.Coord.Y = c1.Coord.Y + c1.Dim.Height then
                            ((i1, c1), (i2, c2))
        }



    let mergeContainersY (c1: Container) (c2: Container) =
        {
            Dim =
                {
                    Length = c1.Dim.Length
                    Width = c1.Dim.Width
                    Height = c1.Dim.Height + c2.Dim.Height
                }
            Weight = c1.Weight + c2.Weight
            Coord = c1.Coord
        }

    let mergersX containers =
        seq {
            for (i1, c1: Container) in containers do
                for (i2, c2) in containers do
                    if (i1 <> i2) then
                        if c1.Coord.Y = c2.Coord.Y
                           && c1.Coord.Z = c2.Coord.Z
                           && c1.Dim.Length = c2.Dim.Length
                           && c2.Dim.Height = c1.Dim.Height
                           && c2.Coord.X = c1.Coord.X + c1.Dim.Width then
                            ((i1, c1), (i2, c2))
        }



    let mergeContainersX (c1: Container) (c2: Container) =
        {
            Dim =
                {
                    Length = c1.Dim.Length
                    Height = c1.Dim.Height
                    Width = c1.Dim.Width + c2.Dim.Width
                }
            Weight = c1.Weight + c2.Weight
            Coord = c1.Coord
        }

    let removeAt index1 index2 input =
        input
        |> List.mapi (fun i el -> (i <> index1 && i <> index2, el))
        |> List.filter fst
        |> List.map snd

    let rec containerLoop merger containers mergeContainersf mergersf added =
        if merger |> Seq.isEmpty then
            containers @ (added |> List.indexed)
        else
            let ((i1, c1), (i2, c2)) = merger |> Seq.head
            let newC = mergeContainersf c1 c2
            let prev = containers.Length
            let containers = containers |> removeAt i1 i2

            let containers =
                containers |> List.map snd |> List.indexed

            let mergers = mergersf containers
            containerLoop mergers ((containers)) mergeContainersf mergersf (newC :: added)

    let init = mergersZ containers

    let containers =
        containerLoop init containers mergeContainersZ mergersZ []
        |> List.map snd
        |> List.indexed

    let init = mergersY containers

    let containers =
        containerLoop init containers mergeContainersY mergersY []
        |> List.map snd
        |> List.indexed

    let init = mergersX containers

    let containers =
        containerLoop init containers mergeContainersX mergersX []
        |> List.map snd

    //containers |> Conflict.containerssCheck

    containers

let containerNestedSort (calcMode: CalculationMode) (containers: Container list) =
    match calcMode with
    | MinimizeLength ->
        (containers
         |> List.map (fun x -> x.Coord.Z, (-(x.Dim |> dimToVolume))))
        |> List.min

    | MinimizeHeight ->
        (containers
         |> List.map (fun x -> x.Coord.Y, (-(x.Dim |> dimToVolume))))
        |> List.min

    | MinimizeVolume ->
        (containers
         |> List.map (fun x -> 0L, (-(x.Dim |> dimToArea))))
        |> List.min


let checkConflictI itemsPut =
    let checkConflict (A: ItemPut) (B: ItemPut) =
        not (
            B.Coord.X >= A.Coord.X + A.Item.Dim.Width
            || B.Coord.X + B.Item.Dim.Width <= A.Coord.X
            || B.Coord.Y >= A.Coord.Y + A.Item.Dim.Height
            || B.Coord.Y + B.Item.Dim.Height <= A.Coord.Y
            || B.Coord.Z >= A.Coord.Z + A.Item.Dim.Length
            || B.Coord.Z + B.Item.Dim.Length <= A.Coord.Z
        )

    for item1 in itemsPut do
        for item2 in itemsPut do
            if item1.Item.Id <> item2.Item.Id
               && checkConflict item1 item2 then
                printfn "Items conflc %A %A" item1 item2
                failwith "wr"

let generate6Comb (item: Item) =
    [
        item
        item |> Rotate.rotateZ
        item |> Rotate.rotateY
        item |> Rotate.rotateY |> Rotate.rotateZ
        item |> Rotate.rotateX
        item |> Rotate.rotateX |> Rotate.rotateZ
    ]
