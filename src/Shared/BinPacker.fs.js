import { CalcResult, ItemsWithCost, Container$reflection, ItemPut$reflection, ItemPut, Coordinates, CalculationMode, Container, Item, Dim as Dim_3 } from "./Shared.fs.js";
import { reverse, max as max_3, sum, fold, forAll, splitAt, findIndex, maxBy, contains, sortByDescending, ofSeq, sumBy, item as item_14, distinct, sortBy, singleton as singleton_1, min, empty as empty_1, cons, mapIndexed, filter, map, length, append, indexed, minBy, ofArray } from "../Client/.fable/fable-library.3.1.1/List.js";
import { fromNumber, fromInt, toNumber, op_Subtraction, fromBits, op_UnaryNegation, equals as equals_1, op_Addition, op_Multiply, compare } from "../Client/.fable/fable-library.3.1.1/Long.js";
import { head, isEmpty, empty, singleton, collect, delay, getEnumerator } from "../Client/.fable/fable-library.3.1.1/Seq.js";
import { stringHash, comparePrimitives, max as max_2, randomNext, safeHash, compareArrays, equals } from "../Client/.fable/fable-library.3.1.1/Util.js";
import { printf, toConsole } from "../Client/.fable/fable-library.3.1.1/String.js";
import { Record } from "../Client/.fable/fable-library.3.1.1/Types.js";
import { record_type, float64_type, list_type } from "../Client/.fable/fable-library.3.1.1/Reflection.js";
import { iterateIndexed } from "../Client/.fable/fable-library.3.1.1/Array.js";

export const random = {};

export function Rotate_rotateToMinZ(calculationMode, item) {
    let item_2, item_4, item_6;
    const comb = ofArray([item, (item_2 = item, item_2.KeepTop ? item_2 : (new Item(new Dim_3(item_2.Dim.Width, item_2.Dim.Length, item_2.Dim.Height), item_2.Weight, item_2.Id, item_2.Tag, item_2.NoTop, item_2.KeepTop, item_2.KeepBottom))), (item_4 = item, new Item(new Dim_3(item_4.Dim.Length, item_4.Dim.Height, item_4.Dim.Width), item_4.Weight, item_4.Id, item_4.Tag, item_4.NoTop, item_4.KeepTop, item_4.KeepBottom)), (item_6 = item, item_6.KeepTop ? item_6 : (new Item(new Dim_3(item_6.Dim.Height, item_6.Dim.Width, item_6.Dim.Length), item_6.Weight, item_6.Id, item_6.Tag, item_6.NoTop, item_6.KeepTop, item_6.KeepBottom)))]);
    switch (calculationMode.tag) {
        case 0: {
            return minBy((d_1) => d_1.Dim.Length, comb, {
                Compare: compare,
            });
        }
        case 2: {
            return minBy((d_2) => d_2.Dim.Length, comb, {
                Compare: compare,
            });
        }
        default: {
            return minBy((d) => d.Dim.Height, comb, {
                Compare: compare,
            });
        }
    }
}

export function dimToVolume(d) {
    return op_Multiply(op_Multiply(d.Width, d.Height), d.Length);
}

export function dimToArea(d) {
    return op_Addition(op_Addition(op_Multiply(d.Width, d.Height), op_Multiply(d.Length, d.Width)), op_Multiply(d.Length, d.Height));
}

export function Conflict_checkConflictC(A, B) {
    const A_1 = A;
    const B_1 = B;
    return !((((((compare(B_1.Coord.X, op_Addition(A_1.Coord.X, A_1.Dim.Width)) >= 0) ? true : (compare(op_Addition(B_1.Coord.X, B_1.Dim.Width), A_1.Coord.X) <= 0)) ? true : (compare(B_1.Coord.Y, op_Addition(A_1.Coord.Y, A_1.Dim.Height)) >= 0)) ? true : (compare(op_Addition(B_1.Coord.Y, B_1.Dim.Height), A_1.Coord.Y) <= 0)) ? true : (compare(B_1.Coord.Z, op_Addition(A_1.Coord.Z, A_1.Dim.Length)) >= 0)) ? true : (compare(op_Addition(B_1.Coord.Z, B_1.Dim.Length), A_1.Coord.Z) <= 0));
}

export function Conflict_containerssCheck(containers) {
    const enumerator = getEnumerator(containers);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const item1 = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const enumerator_1 = getEnumerator(containers);
            try {
                while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
                    const item2 = enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    if ((!equals(item1, item2)) ? Conflict_checkConflictC(item1, item2) : false) {
                        toConsole(printf("contianer conflc %A %A"))(item1)(item2);
                        throw (new Error("conf"));
                    }
                }
            }
            finally {
                enumerator_1.Dispose();
            }
        }
    }
    finally {
        enumerator.Dispose();
    }
}

export function Conflict_checkConflict(A, B) {
    const A_1 = A;
    const B_1 = B;
    return !((((((compare(B_1.Coord.X, op_Addition(A_1.Coord.X, A_1.Item.Dim.Width)) >= 0) ? true : (compare(op_Addition(B_1.Coord.X, B_1.Item.Dim.Width), A_1.Coord.X) <= 0)) ? true : (compare(B_1.Coord.Y, op_Addition(A_1.Coord.Y, A_1.Item.Dim.Height)) >= 0)) ? true : (compare(op_Addition(B_1.Coord.Y, B_1.Item.Dim.Height), A_1.Coord.Y) <= 0)) ? true : (compare(B_1.Coord.Z, op_Addition(A_1.Coord.Z, A_1.Item.Dim.Length)) >= 0)) ? true : (compare(op_Addition(B_1.Coord.Z, B_1.Item.Dim.Length), A_1.Coord.Z) <= 0));
}

export function mergeContainers(containers) {
    const containers_1 = indexed(containers);
    const mergersZ = (containers_2) => delay(() => collect((matchValue) => {
        const i1 = matchValue[0];
        const c1 = matchValue[1];
        return collect((matchValue_1) => {
            const i2 = matchValue_1[0];
            const c2 = matchValue_1[1];
            return (!equals(i1, i2)) ? (((((equals_1(c1.Coord.X, c2.Coord.X) ? equals_1(c1.Coord.Y, c2.Coord.Y) : false) ? equals_1(c1.Dim.Width, c2.Dim.Width) : false) ? equals_1(c2.Dim.Height, c1.Dim.Height) : false) ? equals_1(c2.Coord.Z, op_Addition(c1.Coord.Z, c1.Dim.Length)) : false) ? singleton([[i1, c1], [i2, c2]]) : empty()) : empty();
        }, containers_2);
    }, containers_2));
    const mergersY = (containers_3) => delay(() => collect((matchValue_2) => {
        const i1_1 = matchValue_2[0];
        const c1_2 = matchValue_2[1];
        return collect((matchValue_3) => {
            const i2_1 = matchValue_3[0];
            const c2_2 = matchValue_3[1];
            return (!equals(i1_1, i2_1)) ? (((((equals_1(c1_2.Coord.X, c2_2.Coord.X) ? equals_1(c1_2.Coord.Z, c2_2.Coord.Z) : false) ? equals_1(c1_2.Dim.Length, c2_2.Dim.Length) : false) ? equals_1(c2_2.Dim.Width, c1_2.Dim.Width) : false) ? equals_1(c2_2.Coord.Y, op_Addition(c1_2.Coord.Y, c1_2.Dim.Height)) : false) ? singleton([[i1_1, c1_2], [i2_1, c2_2]]) : empty()) : empty();
        }, containers_3);
    }, containers_3));
    const mergersX = (containers_4) => delay(() => collect((matchValue_4) => {
        const i1_2 = matchValue_4[0];
        const c1_4 = matchValue_4[1];
        return collect((matchValue_5) => {
            const i2_2 = matchValue_5[0];
            const c2_4 = matchValue_5[1];
            return (!equals(i1_2, i2_2)) ? (((((equals_1(c1_4.Coord.Y, c2_4.Coord.Y) ? equals_1(c1_4.Coord.Z, c2_4.Coord.Z) : false) ? equals_1(c1_4.Dim.Length, c2_4.Dim.Length) : false) ? equals_1(c2_4.Dim.Height, c1_4.Dim.Height) : false) ? equals_1(c2_4.Coord.X, op_Addition(c1_4.Coord.X, c1_4.Dim.Width)) : false) ? singleton([[i1_2, c1_4], [i2_2, c2_4]]) : empty()) : empty();
        }, containers_4);
    }, containers_4));
    const containerLoop = (merger_mut, containers_5_mut, mergeContainersf_mut, mergersf_mut, added_mut) => {
        containerLoop:
        while (true) {
            const merger = merger_mut, containers_5 = containers_5_mut, mergeContainersf = mergeContainersf_mut, mergersf = mergersf_mut, added = added_mut;
            if (isEmpty(merger)) {
                return append(containers_5, indexed(added));
            }
            else {
                const patternInput = head(merger);
                const newC = mergeContainersf(patternInput[0][1], patternInput[1][1]);
                const prev = length(containers_5) | 0;
                const containers_7 = indexed(map((tuple_2) => tuple_2[1], map((tuple_1) => tuple_1[1], filter((tuple) => tuple[0], mapIndexed((i, el) => [(i !== patternInput[0][0]) ? (i !== patternInput[1][0]) : false, el], containers_5)))));
                merger_mut = mergersf(containers_7);
                containers_5_mut = containers_7;
                mergeContainersf_mut = mergeContainersf;
                mergersf_mut = mergersf;
                added_mut = cons(newC, added);
                continue containerLoop;
            }
            break;
        }
    };
    const containers_8 = indexed(map((tuple_3) => tuple_3[1], containerLoop(mergersZ(containers_1), containers_1, (c1_1, c2_1) => (new Container(new Dim_3(c1_1.Dim.Width, c1_1.Dim.Height, op_Addition(c1_1.Dim.Length, c2_1.Dim.Length)), c1_1.Coord, c1_1.Weight + c2_1.Weight)), mergersZ, empty_1())));
    const containers_9 = indexed(map((tuple_4) => tuple_4[1], containerLoop(mergersY(containers_8), containers_8, (c1_3, c2_3) => (new Container(new Dim_3(c1_3.Dim.Width, op_Addition(c1_3.Dim.Height, c2_3.Dim.Height), c1_3.Dim.Length), c1_3.Coord, c1_3.Weight + c2_3.Weight)), mergersY, empty_1())));
    return map((tuple_5) => tuple_5[1], containerLoop(mergersX(containers_9), containers_9, (c1_5, c2_5) => (new Container(new Dim_3(op_Addition(c1_5.Dim.Width, c2_5.Dim.Width), c1_5.Dim.Height, c1_5.Dim.Length), c1_5.Coord, c1_5.Weight + c2_5.Weight)), mergersX, empty_1()));
}

export function containerNestedSort(calcMode, containers) {
    switch (calcMode.tag) {
        case 1: {
            return min(map((x_2) => [x_2.Coord.Y, op_UnaryNegation(dimToVolume(x_2.Dim))], containers), {
                Compare: compareArrays,
            });
        }
        case 2: {
            return min(map((x_4) => [fromBits(0, 0, false), op_UnaryNegation(dimToVolume(x_4.Dim))], containers), {
                Compare: compareArrays,
            });
        }
        default: {
            return min(map((x) => [x.Coord.Z, op_UnaryNegation(dimToVolume(x.Dim))], containers), {
                Compare: compareArrays,
            });
        }
    }
}

export function putItem(rootContainer_mut, calculationMode_mut, tryCount_mut, container_mut, item_mut, weightPut_mut) {
    let item_2, item_7, item_5, item_12, item_10, _arg1, l;
    putItem:
    while (true) {
        const rootContainer = rootContainer_mut, calculationMode = calculationMode_mut, tryCount = tryCount_mut, container = container_mut, item = item_mut, weightPut = weightPut_mut;
        const remainingWidth = op_Subtraction(container.Dim.Width, item.Dim.Width);
        const remainingHeight = op_Subtraction(container.Dim.Height, item.Dim.Height);
        const remainingLength = op_Subtraction(container.Dim.Length, item.Dim.Length);
        if (((rootContainer.Weight - weightPut) - item.Weight) < 0) {
            return [singleton_1(singleton_1(container)), void 0];
        }
        else if (item.NoTop ? (compare(op_Addition(container.Coord.Y, container.Dim.Height), rootContainer.Dim.Height) < 0) : false) {
            return void 0;
        }
        else if (item.KeepBottom ? (compare(container.Coord.Y, fromBits(0, 0, false)) > 0) : false) {
            return void 0;
        }
        else if (((compare(remainingHeight, fromBits(0, 0, false)) < 0) ? true : (compare(remainingLength, fromBits(0, 0, false)) < 0)) ? true : (compare(remainingWidth, fromBits(0, 0, false)) < 0)) {
            if (tryCount > 0) {
                if (tryCount === 3) {
                    rootContainer_mut = rootContainer;
                    calculationMode_mut = calculationMode;
                    tryCount_mut = (tryCount - 1);
                    container_mut = container;
                    item_mut = (item_2 = item, item_2.KeepTop ? item_2 : (new Item(new Dim_3(item_2.Dim.Height, item_2.Dim.Width, item_2.Dim.Length), item_2.Weight, item_2.Id, item_2.Tag, item_2.NoTop, item_2.KeepTop, item_2.KeepBottom)));
                    weightPut_mut = weightPut;
                    continue putItem;
                }
                else if (tryCount === 2) {
                    rootContainer_mut = rootContainer;
                    calculationMode_mut = calculationMode;
                    tryCount_mut = (tryCount - 1);
                    container_mut = container;
                    item_mut = (item_7 = (item_5 = item, item_5.KeepTop ? item_5 : (new Item(new Dim_3(item_5.Dim.Height, item_5.Dim.Width, item_5.Dim.Length), item_5.Weight, item_5.Id, item_5.Tag, item_5.NoTop, item_5.KeepTop, item_5.KeepBottom))), new Item(new Dim_3(item_7.Dim.Length, item_7.Dim.Height, item_7.Dim.Width), item_7.Weight, item_7.Id, item_7.Tag, item_7.NoTop, item_7.KeepTop, item_7.KeepBottom));
                    weightPut_mut = weightPut;
                    continue putItem;
                }
                else {
                    rootContainer_mut = rootContainer;
                    calculationMode_mut = calculationMode;
                    tryCount_mut = (tryCount - 1);
                    container_mut = container;
                    item_mut = (item_12 = (item_10 = item, new Item(new Dim_3(item_10.Dim.Length, item_10.Dim.Height, item_10.Dim.Width), item_10.Weight, item_10.Id, item_10.Tag, item_10.NoTop, item_10.KeepTop, item_10.KeepBottom)), item_12.KeepTop ? item_12 : (new Item(new Dim_3(item_12.Dim.Width, item_12.Dim.Length, item_12.Dim.Height), item_12.Weight, item_12.Id, item_12.Tag, item_12.NoTop, item_12.KeepTop, item_12.KeepBottom)));
                    weightPut_mut = weightPut;
                    continue putItem;
                }
            }
            else {
                return void 0;
            }
        }
        else {
            const calculationMode_1 = item.NoTop ? (new CalculationMode(1)) : calculationMode;
            const containerSort = (calculationMode_1.tag === 1) ? ((s_1) => s_1.Coord.Y) : ((calculationMode_1.tag === 0) ? ((s_2) => s_2.Coord.Z) : ((s) => op_UnaryNegation(dimToVolume(s.Dim))));
            const noTopFilter = (s_3) => (!(((item.NoTop ? equals_1(s_3.Coord.Y, op_Addition(container.Coord.Y, item.Dim.Height)) : false) ? equals_1(s_3.Coord.X, container.Coord.X) : false) ? equals_1(s_3.Coord.Z, container.Coord.Z) : false));
            const patternInput = (calculationMode_1.tag === 0) ? [sortBy(containerSort, filter(noTopFilter, filter((s_4) => {
                if ((compare(s_4.Dim.Width, fromBits(0, 0, false)) > 0) ? (compare(s_4.Dim.Height, fromBits(0, 0, false)) > 0) : false) {
                    return compare(s_4.Dim.Length, fromBits(0, 0, false)) > 0;
                }
                else {
                    return false;
                }
            }, ofArray([new Container(new Dim_3(container.Dim.Width, remainingHeight, item.Dim.Length), new Coordinates(container.Coord.X, op_Addition(container.Coord.Y, item.Dim.Height), container.Coord.Z), 0), new Container(new Dim_3(remainingWidth, item.Dim.Height, item.Dim.Length), new Coordinates(op_Addition(container.Coord.X, item.Dim.Width), container.Coord.Y, container.Coord.Z), 0), new Container(new Dim_3(container.Dim.Width, container.Dim.Height, remainingLength), new Coordinates(container.Coord.X, container.Coord.Y, op_Addition(container.Coord.Z, item.Dim.Length)), 0)]))), {
                Compare: compare,
            }), sortBy(containerSort, filter(noTopFilter, filter((s_5) => {
                if ((compare(s_5.Dim.Width, fromBits(0, 0, false)) > 0) ? (compare(s_5.Dim.Height, fromBits(0, 0, false)) > 0) : false) {
                    return compare(s_5.Dim.Length, fromBits(0, 0, false)) > 0;
                }
                else {
                    return false;
                }
            }, ofArray([new Container(new Dim_3(item.Dim.Width, remainingHeight, item.Dim.Length), new Coordinates(container.Coord.X, op_Addition(container.Coord.Y, item.Dim.Height), container.Coord.Z), 0), new Container(new Dim_3(remainingWidth, container.Dim.Height, item.Dim.Length), new Coordinates(op_Addition(container.Coord.X, item.Dim.Width), container.Coord.Y, container.Coord.Z), 0), new Container(new Dim_3(container.Dim.Width, container.Dim.Height, remainingLength), new Coordinates(container.Coord.X, container.Coord.Y, op_Addition(container.Coord.Z, item.Dim.Length)), 0)]))), {
                Compare: compare,
            }), sortBy(containerSort, filter(noTopFilter, filter((s_6) => {
                if ((compare(s_6.Dim.Width, fromBits(0, 0, false)) > 0) ? (compare(s_6.Dim.Height, fromBits(0, 0, false)) > 0) : false) {
                    return compare(s_6.Dim.Length, fromBits(0, 0, false)) > 0;
                }
                else {
                    return false;
                }
            }, ofArray([new Container(new Dim_3(container.Dim.Width, remainingHeight, container.Dim.Length), new Coordinates(container.Coord.X, op_Addition(container.Coord.Y, item.Dim.Height), container.Coord.Z), 0), new Container(new Dim_3(remainingWidth, item.Dim.Height, container.Dim.Length), new Coordinates(op_Addition(container.Coord.X, item.Dim.Width), container.Coord.Y, container.Coord.Z), 0), new Container(new Dim_3(item.Dim.Width, item.Dim.Height, remainingLength), new Coordinates(container.Coord.X, container.Coord.Y, op_Addition(container.Coord.Z, item.Dim.Length)), 0)]))), {
                Compare: compare,
            }), sortBy(containerSort, filter(noTopFilter, filter((s_7) => {
                if ((compare(s_7.Dim.Width, fromBits(0, 0, false)) > 0) ? (compare(s_7.Dim.Height, fromBits(0, 0, false)) > 0) : false) {
                    return compare(s_7.Dim.Length, fromBits(0, 0, false)) > 0;
                }
                else {
                    return false;
                }
            }, ofArray([new Container(new Dim_3(item.Dim.Width, remainingHeight, container.Dim.Length), new Coordinates(container.Coord.X, op_Addition(container.Coord.Y, item.Dim.Height), container.Coord.Z), 0), new Container(new Dim_3(remainingWidth, container.Dim.Height, container.Dim.Length), new Coordinates(op_Addition(container.Coord.X, item.Dim.Width), container.Coord.Y, container.Coord.Z), 0), new Container(new Dim_3(item.Dim.Width, item.Dim.Height, remainingLength), new Coordinates(container.Coord.X, container.Coord.Y, op_Addition(container.Coord.Z, item.Dim.Length)), 0)]))), {
                Compare: compare,
            })] : [sortBy(containerSort, filter(noTopFilter, filter((s_8) => {
                if ((compare(s_8.Dim.Width, fromBits(0, 0, false)) > 0) ? (compare(s_8.Dim.Height, fromBits(0, 0, false)) > 0) : false) {
                    return compare(s_8.Dim.Length, fromBits(0, 0, false)) > 0;
                }
                else {
                    return false;
                }
            }, ofArray([new Container(new Dim_3(container.Dim.Width, item.Dim.Height, remainingLength), new Coordinates(container.Coord.X, container.Coord.Y, op_Addition(container.Coord.Z, item.Dim.Length)), 0), new Container(new Dim_3(remainingWidth, item.Dim.Height, item.Dim.Length), new Coordinates(op_Addition(container.Coord.X, item.Dim.Width), container.Coord.Y, container.Coord.Z), 0), new Container(new Dim_3(container.Dim.Width, remainingHeight, container.Dim.Length), new Coordinates(container.Coord.X, op_Addition(container.Coord.Y, item.Dim.Height), container.Coord.Z), 0)]))), {
                Compare: compare,
            }), sortBy(containerSort, filter(noTopFilter, filter((s_9) => {
                if ((compare(s_9.Dim.Width, fromBits(0, 0, false)) > 0) ? (compare(s_9.Dim.Height, fromBits(0, 0, false)) > 0) : false) {
                    return compare(s_9.Dim.Length, fromBits(0, 0, false)) > 0;
                }
                else {
                    return false;
                }
            }, ofArray([new Container(new Dim_3(item.Dim.Width, item.Dim.Height, remainingLength), new Coordinates(container.Coord.X, container.Coord.Y, op_Addition(container.Coord.Z, item.Dim.Length)), 0), new Container(new Dim_3(remainingWidth, item.Dim.Height, container.Dim.Length), new Coordinates(op_Addition(container.Coord.X, item.Dim.Width), container.Coord.Y, container.Coord.Z), 0), new Container(new Dim_3(container.Dim.Width, remainingHeight, container.Dim.Length), new Coordinates(container.Coord.X, op_Addition(container.Coord.Y, item.Dim.Height), container.Coord.Z), 0)]))), {
                Compare: compare,
            }), sortBy(containerSort, filter(noTopFilter, filter((s_10) => {
                if ((compare(s_10.Dim.Width, fromBits(0, 0, false)) > 0) ? (compare(s_10.Dim.Height, fromBits(0, 0, false)) > 0) : false) {
                    return compare(s_10.Dim.Length, fromBits(0, 0, false)) > 0;
                }
                else {
                    return false;
                }
            }, ofArray([new Container(new Dim_3(container.Dim.Width, container.Dim.Height, remainingLength), new Coordinates(container.Coord.X, container.Coord.Y, op_Addition(container.Coord.Z, item.Dim.Length)), 0), new Container(new Dim_3(remainingWidth, container.Dim.Height, item.Dim.Length), new Coordinates(op_Addition(container.Coord.X, item.Dim.Width), container.Coord.Y, container.Coord.Z), 0), new Container(new Dim_3(item.Dim.Width, remainingHeight, item.Dim.Length), new Coordinates(container.Coord.X, op_Addition(container.Coord.Y, item.Dim.Height), container.Coord.Z), 0)]))), {
                Compare: compare,
            }), sortBy(containerSort, filter(noTopFilter, filter((s_11) => {
                if ((compare(s_11.Dim.Width, fromBits(0, 0, false)) > 0) ? (compare(s_11.Dim.Height, fromBits(0, 0, false)) > 0) : false) {
                    return compare(s_11.Dim.Length, fromBits(0, 0, false)) > 0;
                }
                else {
                    return false;
                }
            }, ofArray([new Container(new Dim_3(item.Dim.Width, container.Dim.Height, remainingLength), new Coordinates(container.Coord.X, container.Coord.Y, op_Addition(container.Coord.Z, item.Dim.Length)), 0), new Container(new Dim_3(remainingWidth, container.Dim.Height, container.Dim.Length), new Coordinates(op_Addition(container.Coord.X, item.Dim.Width), container.Coord.Y, container.Coord.Z), 0), new Container(new Dim_3(item.Dim.Width, remainingHeight, item.Dim.Length), new Coordinates(container.Coord.X, op_Addition(container.Coord.Y, item.Dim.Height), container.Coord.Z), 0)]))), {
                Compare: compare,
            })];
            const config4_2 = patternInput[3];
            const config3_2 = patternInput[2];
            const config2_2 = patternInput[1];
            const config1_2 = patternInput[0];
            const itemPut = new ItemPut(item, new Coordinates(container.Coord.X, container.Coord.Y, container.Coord.Z));
            const all = (calculationMode_1.tag === 0) ? distinct(ofArray([config2_2, config1_2, config3_2, config4_2]), {
                Equals: equals,
                GetHashCode: safeHash,
            }) : ((calculationMode_1.tag === 1) ? distinct(ofArray([config3_2, config4_2, config2_2, config1_2]), {
                Equals: equals,
                GetHashCode: safeHash,
            }) : distinct(ofArray([config2_2, config1_2, config3_2, config4_2]), {
                Equals: equals,
                GetHashCode: safeHash,
            }));
            const t1 = item_14(randomNext(0, length(all)), all);
            const sets = item.NoTop ? ((calculationMode_1.tag === 0) ? ofArray([config2_2, config1_2]) : ofArray([config3_2, config4_2])) : ofArray([t1, (_arg1 = all, (_arg1.tail != null) ? ((_arg1.tail.tail == null) ? _arg1.head : (l = filter((e) => (!equals(e, t1)), all), item_14(randomNext(0, length(l)), l))) : empty_1())]);
            return [sortBy((containers) => containerNestedSort(calculationMode_1, containers), filter((f) => (!(f.tail == null)), distinct(all, {
                Equals: equals,
                GetHashCode: safeHash,
            })), {
                Compare: compareArrays,
            }), itemPut];
        }
        break;
    }
}

export function checkConflictI(itemsPut) {
    let A_1, B_1;
    const enumerator = getEnumerator(itemsPut);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const item1 = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            let enumerator_1;
            let copyOfStruct = itemsPut;
            enumerator_1 = getEnumerator(copyOfStruct);
            try {
                while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
                    const item2 = enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    if ((item1.Item.Id !== item2.Item.Id) ? (A_1 = item1, (B_1 = item2, !((((((compare(B_1.Coord.X, op_Addition(A_1.Coord.X, A_1.Item.Dim.Width)) >= 0) ? true : (compare(op_Addition(B_1.Coord.X, B_1.Item.Dim.Width), A_1.Coord.X) <= 0)) ? true : (compare(B_1.Coord.Y, op_Addition(A_1.Coord.Y, A_1.Item.Dim.Height)) >= 0)) ? true : (compare(op_Addition(B_1.Coord.Y, B_1.Item.Dim.Height), A_1.Coord.Y) <= 0)) ? true : (compare(B_1.Coord.Z, op_Addition(A_1.Coord.Z, A_1.Item.Dim.Length)) >= 0)) ? true : (compare(op_Addition(B_1.Coord.Z, B_1.Item.Dim.Length), A_1.Coord.Z) <= 0)))) : false) {
                        toConsole(printf("Items conflc %A %A"))(item1)(item2);
                        throw (new Error("wr"));
                    }
                }
            }
            finally {
                enumerator_1.Dispose();
            }
        }
    }
    finally {
        enumerator.Dispose();
    }
}

export function calculateCost(calculationMode, putItem_1, containers, items) {
    const loop = (_arg1_mut) => {
        loop:
        while (true) {
            const _arg1 = _arg1_mut;
            let pattern_matching_result, containerSet_1, itemPuts_1, containerSet_2, counter_1, item_1, itemPuts_2, remainingItems_1, remainingStack_1;
            if (_arg1[0].tail != null) {
                if (_arg1[0].head[1].tail != null) {
                    if (_arg1[1] > 0) {
                        pattern_matching_result = 1;
                        containerSet_2 = _arg1[0].head[0];
                        counter_1 = _arg1[1];
                        item_1 = _arg1[0].head[1].head;
                        itemPuts_2 = _arg1[0].head[2];
                        remainingItems_1 = _arg1[0].head[1].tail;
                        remainingStack_1 = _arg1[0].tail;
                    }
                    else {
                        pattern_matching_result = 2;
                    }
                }
                else {
                    pattern_matching_result = 0;
                    containerSet_1 = _arg1[0].head[0];
                    itemPuts_1 = _arg1[0].head[2];
                }
            }
            else {
                pattern_matching_result = 2;
            }
            switch (pattern_matching_result) {
                case 0: {
                    return [containerSet_1, itemPuts_1];
                }
                case 1: {
                    const containerSet_3 = mergeContainers(containerSet_2);
                    const loopContainers = (_arg2_mut) => {
                        loopContainers:
                        while (true) {
                            const _arg2 = _arg2_mut;
                            if (_arg2[0].tail != null) {
                                const triedButNotFit = _arg2[1];
                                const remainingContainers = _arg2[0].tail;
                                const container = _arg2[0].head;
                                const matchValue = putItem_1(container, item_1, sumBy((x) => x.Item.Weight, itemPuts_2, {
                                    GetZero: () => 0,
                                    Add: (x_1, y) => (x_1 + y),
                                }));
                                if (matchValue != null) {
                                    const itemPut = matchValue[1];
                                    const containerTriplets = matchValue[0];
                                    return ofSeq(delay(() => {
                                        const newItems = (itemPut != null) ? cons(itemPut, itemPuts_2) : itemPuts_2;
                                        return (containerTriplets.tail == null) ? singleton([mergeContainers(append(remainingContainers, triedButNotFit)), remainingItems_1, newItems]) : collect((triplet) => {
                                            const rema = mergeContainers(append(remainingContainers, append(triplet, triedButNotFit)));
                                            return singleton([sortBy((calculationMode.tag === 0) ? ((s_1) => [s_1.Coord.Z, op_UnaryNegation(dimToVolume(s_1.Dim))]) : ((calculationMode.tag === 2) ? ((s_2) => [fromBits(0, 0, false), op_UnaryNegation(dimToVolume(s_2.Dim))]) : ((s) => [s.Coord.Y, op_UnaryNegation(dimToVolume(s.Dim))])), rema, {
                                                Compare: compareArrays,
                                            }), remainingItems_1, newItems]);
                                        }, containerTriplets);
                                    }));
                                }
                                else {
                                    _arg2_mut = [remainingContainers, cons(container, triedButNotFit)];
                                    continue loopContainers;
                                }
                            }
                            else {
                                return empty_1();
                            }
                            break;
                        }
                    };
                    _arg1_mut = [append(loopContainers([sortBy((calculationMode.tag === 1) ? ((s_4) => s_4.Coord.Y) : ((calculationMode.tag === 0) ? ((s_5) => s_5.Coord.Z) : ((s_3) => dimToVolume(s_3.Dim))), containerSet_3, {
                        Compare: compare,
                    }), empty_1()]), remainingStack_1), counter_1 - 1];
                    continue loop;
                }
                case 2: {
                    if (_arg1[0].tail != null) {
                        return [_arg1[0].head[0], _arg1[0].head[2]];
                    }
                    else {
                        return [containers, empty_1()];
                    }
                }
            }
            break;
        }
    };
    return loop([singleton_1([containers, items, empty_1()]), 1000]);
}

export function calcVolume(item) {
    return (toNumber(item.Dim.Width) * toNumber(item.Dim.Height)) * toNumber(item.Dim.Length);
}

export function maxDim(item) {
    return max_2(compare, item.Dim.Width, max_2(compare, item.Dim.Height, item.Dim.Length));
}

export function maxVol(item) {
    return op_Multiply(op_Multiply(item.Dim.Width, item.Dim.Height), item.Dim.Length);
}

export const TMin = 0.01;

export function calcCost(rootContainer, calculationMode, containers, items) {
    const matchValue = calculateCost(calculationMode, (container, item, weightPut) => putItem(rootContainer, calculationMode, 3, container, item, weightPut), containers, sortByDescending(calcVolume, items, {
        Compare: comparePrimitives,
    }));
    if (matchValue == null) {
        return [1.7976931348623157E+308, empty_1(), empty_1()];
    }
    else {
        const res = matchValue[1];
        const cs_1 = mergeContainers(matchValue[0]);
        let unfitItems;
        const itemsPutIds = map((d) => d.Item.Id, res);
        unfitItems = filter((i) => (!contains(i.Id, itemsPutIds, {
            Equals: (x_1, y_1) => (x_1 === y_1),
            GetHashCode: stringHash,
        })), items);
        const sumZ = (length(res) === 0) ? fromBits(4294967295, 2147483647, false) : ((calculationMode.tag === 2) ? sumBy((x_4) => op_Addition(x_4.Coord.Z, x_4.Item.Dim.Length), res, {
            GetZero: () => fromInt(0),
            Add: op_Addition,
        }) : ((calculationMode.tag === 0) ? sumBy((x_4) => op_Addition(x_4.Coord.Z, x_4.Item.Dim.Length), res, {
            GetZero: () => fromInt(0),
            Add: op_Addition,
        }) : sumBy((x_2) => op_Addition(x_2.Coord.Y, x_2.Item.Dim.Height), res, {
            GetZero: () => fromInt(0),
            Add: op_Addition,
        })));
        let maxZCoord;
        if (length(res) === 0) {
            maxZCoord = fromBits(4294967295, 2147483647, false);
        }
        else {
            switch (calculationMode.tag) {
                case 2:
                case 0: {
                    const max_1 = maxBy((x_8) => op_Addition(x_8.Coord.Z, x_8.Item.Dim.Length), res, {
                        Compare: compare,
                    });
                    maxZCoord = op_Addition(max_1.Item.Dim.Length, max_1.Coord.Z);
                    break;
                }
                default: {
                    const max = maxBy((x_6) => op_Addition(x_6.Coord.Y, x_6.Item.Dim.Height), res, {
                        Compare: compare,
                    });
                    maxZCoord = op_Addition(max.Item.Dim.Height, max.Coord.Y);
                }
            }
        }
        return [((sumBy(calcVolume, unfitItems, {
            GetZero: () => 0,
            Add: (x_10, y_6) => (x_10 + y_6),
        }) * 1000) + (1 * toNumber(sumZ))) + (1 * toNumber(maxZCoord)), res, cs_1];
    }
}

export class GlobalBest extends Record {
    constructor(ItemsPut, Cost, ContainerSet) {
        super();
        this.ItemsPut = ItemsPut;
        this.Cost = Cost;
        this.ContainerSet = ContainerSet;
    }
}

export function GlobalBest$reflection() {
    return record_type("BinPacker.GlobalBest", [], GlobalBest, () => [["ItemsPut", list_type(ItemPut$reflection())], ["Cost", float64_type], ["ContainerSet", list_type(Container$reflection())]]);
}

export function calc(rootContainer_mut, calculationMode_mut, containers_mut, itemsWithCost_mut, globalBest_mut, T_mut, alpha_mut, result_mut, sw_mut) {
    calc:
    while (true) {
        const rootContainer = rootContainer_mut, calculationMode = calculationMode_mut, containers = containers_mut, itemsWithCost = itemsWithCost_mut, globalBest = globalBest_mut, T = T_mut, alpha = alpha_mut, result = result_mut, sw = sw_mut;
        const T_1 = T;
        if (((TMin >= T_1) ? true : (compare(sw.ElapsedMilliseconds, fromBits(2000, 0, false)) > 0)) ? true : ((length(itemsWithCost.Items) === 1) ? (length(globalBest.ItemsPut) === 1) : false)) {
            return globalBest;
        }
        else {
            let patternInput_1;
            if (itemsWithCost.Cost === 0) {
                const patternInput = calcCost(rootContainer, calculationMode, containers, itemsWithCost.Items);
                const res = patternInput[1];
                const cost = patternInput[0];
                patternInput_1 = [new ItemsWithCost(itemsWithCost.Items, cost), res, new GlobalBest(res, cost, patternInput[2])];
            }
            else {
                patternInput_1 = [itemsWithCost, result, globalBest];
            }
            const globalBest_1 = patternInput_1[2];
            const calculated = patternInput_1[0];
            const loop = (tupledArg) => {
                const itemsWC = tupledArg[0];
                const res_2 = tupledArg[1];
                return (globalBest_2) => ((count) => {
                    if (count === 0) {
                        return [itemsWC, res_2, globalBest_2];
                    }
                    else {
                        const items_1 = itemsWC.Items;
                        const mutate = (itemsPut, items_2) => {
                            const calcMode = calculationMode;
                            const itemsPut_1 = itemsPut;
                            const items_3 = items_2;
                            if (items_3.tail == null) {
                                return empty_1();
                            }
                            else {
                                let firstSwap;
                                if ((Math.random() > 0.6) ? true : (itemsPut_1.tail == null)) {
                                    firstSwap = randomNext(0, length(items_3));
                                }
                                else {
                                    const maxId = maxBy((calcMode.tag === 0) ? ((x) => x.Coord.Z) : ((calcMode.tag === 1) ? ((x_1) => x_1.Coord.Y) : ((x) => x.Coord.Z)), itemsPut_1, {
                                        Compare: compare,
                                    });
                                    firstSwap = findIndex((x_3) => (x_3.Id === maxId.Item.Id), items_3);
                                }
                                const secondSwap = randomNext(0, length(items_3)) | 0;
                                const arr = Array.from(items_3);
                                let tmp;
                                const item_1 = arr[firstSwap];
                                const r = Math.random();
                                if (r < 0.333) {
                                    const item_2 = item_1;
                                    tmp = (item_2.KeepTop ? item_2 : (new Item(new Dim_3(item_2.Dim.Height, item_2.Dim.Width, item_2.Dim.Length), item_2.Weight, item_2.Id, item_2.Tag, item_2.NoTop, item_2.KeepTop, item_2.KeepBottom)));
                                }
                                else if (r < 0.666) {
                                    const item_3 = item_1;
                                    tmp = (new Item(new Dim_3(item_3.Dim.Length, item_3.Dim.Height, item_3.Dim.Width), item_3.Weight, item_3.Id, item_3.Tag, item_3.NoTop, item_3.KeepTop, item_3.KeepBottom));
                                }
                                else {
                                    const item_4 = item_1;
                                    tmp = (item_4.KeepTop ? item_4 : (new Item(new Dim_3(item_4.Dim.Width, item_4.Dim.Length, item_4.Dim.Height), item_4.Weight, item_4.Id, item_4.Tag, item_4.NoTop, item_4.KeepTop, item_4.KeepBottom)));
                                }
                                arr[firstSwap] = arr[secondSwap];
                                arr[secondSwap] = tmp;
                                return ofArray(arr);
                            }
                        };
                        const nbr = mutate(res_2, mutate(res_2, mutate(res_2, mutate(res_2, mutate(res_2, items_1)))));
                        const patternInput_2 = calcCost(rootContainer, calculationMode, containers, nbr);
                        const nbrRes = patternInput_2[1];
                        const nbrCost = patternInput_2[0];
                        let patternInput_3;
                        if (nbrCost < calculated.Cost) {
                            patternInput_3 = [new ItemsWithCost(nbr, nbrCost), nbrRes, (nbrCost < globalBest_2.Cost) ? (new GlobalBest(nbrRes, nbrCost, patternInput_2[2])) : globalBest_2];
                        }
                        else {
                            const exp = Math.exp((calculated.Cost - nbrCost) / T_1);
                            patternInput_3 = (((exp < 1) ? (exp > Math.random()) : false) ? [new ItemsWithCost(nbr, nbrCost), nbrRes, globalBest_2] : [new ItemsWithCost(items_1, calculated.Cost), res_2, globalBest_2]);
                        }
                        return loop([patternInput_3[0], patternInput_3[1]])(patternInput_3[2])(count - 1);
                    }
                });
            };
            if (((TMin >= T_1) ? true : (compare(sw.ElapsedMilliseconds, fromBits(2000, 0, false)) > 0)) ? true : ((length(itemsWithCost.Items) === 1) ? (length(globalBest_1.ItemsPut) === 1) : false)) {
                return globalBest_1;
            }
            else {
                const patternInput_4 = loop([calculated, patternInput_1[1]])(globalBest_1)(3);
                rootContainer_mut = rootContainer;
                calculationMode_mut = calculationMode;
                containers_mut = containers;
                itemsWithCost_mut = patternInput_4[0];
                globalBest_mut = patternInput_4[2];
                T_mut = (T_1 * alpha);
                alpha_mut = alpha;
                result_mut = patternInput_4[1];
                sw_mut = sw;
                continue calc;
            }
        }
        break;
    }
}

export function runInner(sw, rootContainer, calculationMode, containers, items, T, alpha) {
    try {
        const globalBest = calc(rootContainer, calculationMode, containers, new ItemsWithCost(items, 0), new GlobalBest(empty_1(), 1.7976931348623157E+308, containers), T, alpha, empty_1(), sw.StartNew());
        const itemsPut = globalBest.ItemsPut;
        const volumeContainer = op_Multiply(op_Multiply(rootContainer.Dim.Height, rootContainer.Dim.Width), rootContainer.Dim.Length);
        let itemsUnput;
        const itemsPutIds = map((d) => d.Item.Id, itemsPut);
        itemsUnput = filter((i) => (!contains(i.Id, itemsPutIds, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        })), items);
        const putVolume = sumBy(calcVolume, itemsUnput, {
            GetZero: () => 0,
            Add: (x_1, y_1) => (x_1 + y_1),
        });
        const enumerator = getEnumerator(itemsPut);
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const item1 = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                const enumerator_1 = getEnumerator(itemsPut);
                try {
                    while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
                        const item2 = enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                        if ((item1.Item.Id !== item2.Item.Id) ? Conflict_checkConflict(item1, item2) : false) {
                            toConsole(printf("Items conflc %A %A"))(item1)(item2);
                        }
                    }
                }
                finally {
                    enumerator_1.Dispose();
                }
            }
        }
        finally {
            enumerator.Dispose();
        }
        return new CalcResult(itemsPut, volumeContainer, itemsUnput, fromNumber(putVolume, false), rootContainer, globalBest.ContainerSet);
    }
    catch (e) {
        toConsole(printf("%A"))(e);
        throw e;
    }
}

export function swap(a, x, y) {
    const tmp = a[x];
    a[x] = a[y];
    a[y] = tmp;
}

export function shuffle(a) {
    iterateIndexed((i, _arg1) => {
        swap(a, i, randomNext(i, a.length));
    }, a);
    return a;
}

export const defaultBatchSize = 20;

export function runPerContainer(logger, sw, rootContainer, containerMode, calculationMode, items, T, alpha) {
    const loop = (rootContainer_1_mut, containers_mut, calculationMode_1_mut, items_1_mut, results_mut, batchCount_mut, retryCount_mut) => {
        let _arg2;
        loop:
        while (true) {
            const rootContainer_1 = rootContainer_1_mut, containers = containers_mut, calculationMode_1 = calculationMode_1_mut, items_1 = items_1_mut, results = results_mut, batchCount = batchCount_mut, retryCount = retryCount_mut;
            const containers_1 = sortBy((calculationMode_1.tag === 0) ? ((c_1) => [c_1.Coord.Z, op_UnaryNegation(dimToVolume(c_1.Dim))]) : ((calculationMode_1.tag === 2) ? ((c_2) => [fromBits(0, 0, false), op_UnaryNegation(dimToVolume(c_2.Dim))]) : ((c) => [c.Coord.Y, op_UnaryNegation(dimToVolume(c.Dim))])), containers, {
                Compare: compareArrays,
            });
            const patternInput = (length(items_1) > batchCount) ? splitAt(batchCount, items_1) : [items_1, empty_1()];
            const remainingItems = patternInput[1];
            const batchCount_1 = batchCount | 0;
            const res = runInner(sw, rootContainer_1, calculationMode_1, containers_1, patternInput[0], T, alpha);
            const rootContainer_2 = new Container(rootContainer_1.Dim, rootContainer_1.Coord, rootContainer_1.Weight - sumBy((s) => s.Item.Weight, res.ItemsPut, {
                GetZero: () => 0,
                Add: (x_1, y_1) => (x_1 + y_1),
            }));
            const lastunput = res.ItemsUnput;
            const newItems = append(remainingItems, ofArray(shuffle(Array.from(lastunput))));
            const res_1 = new CalcResult(res.ItemsPut, res.ContainerVol, empty_1(), res.PutVolume, res.Container, res.EmptyContainers);
            const results_1 = cons(res_1, results);
            const retryCount_1 = ((res_1.ItemsPut.tail == null) ? (retryCount - 1) : retryCount) | 0;
            logger.Log("unput items :{@unput} - remaining:{@remaining} -batchCount:{@batchCount}", [length(lastunput), length(remainingItems), batchCount_1]);
            const rbatchCount = max_2(comparePrimitives, 1, ~(~(batchCount_1 / 2))) | 0;
            const matchValue = [(compare(sw.ElapsedMilliseconds, (containerMode.tag === 1) ? fromBits(300000, 0, false) : fromBits(90000, 0, false)) > 0) ? true : forAll((x_3) => (x_3.Weight > rootContainer_2.Weight), items_1), newItems, retryCount_1];
            let pattern_matching_result;
            if (matchValue[0]) {
                pattern_matching_result = 1;
            }
            else if (matchValue[1].tail == null) {
                if (matchValue[2] === -1) {
                    pattern_matching_result = 1;
                }
                else if (matchValue[2] === 0) {
                    pattern_matching_result = 1;
                }
                else {
                    pattern_matching_result = 1;
                }
            }
            else if (matchValue[2] === -1) {
                pattern_matching_result = 1;
            }
            else if (matchValue[2] === 0) {
                pattern_matching_result = 1;
            }
            else if (matchValue[2] === 2) {
                pattern_matching_result = 0;
            }
            else if (matchValue[2] === 3) {
                pattern_matching_result = 0;
            }
            else if (matchValue[2] === 4) {
                pattern_matching_result = 0;
            }
            else {
                pattern_matching_result = 2;
            }
            switch (pattern_matching_result) {
                case 0: {
                    rootContainer_1_mut = rootContainer_2;
                    containers_mut = mergeContainers(res_1.EmptyContainers);
                    calculationMode_1_mut = calculationMode_1;
                    items_1_mut = newItems;
                    results_mut = results_1;
                    batchCount_mut = rbatchCount;
                    retryCount_mut = retryCount_1;
                    continue loop;
                }
                case 1: {
                    const itemsPut = distinct(fold(append, empty_1(), map((c_3) => c_3.ItemsPut, results_1)), {
                        Equals: equals,
                        GetHashCode: safeHash,
                    });
                    return new CalcResult(itemsPut, dimToVolume(rootContainer_2.Dim), append(lastunput, remainingItems), (_arg2 = map((x_5) => dimToVolume(x_5.Item.Dim), itemsPut), (_arg2.tail == null) ? fromBits(0, 0, false) : sum(_arg2, {
                        GetZero: () => fromInt(0),
                        Add: op_Addition,
                    })), rootContainer_2, res_1.EmptyContainers);
                }
                case 2: {
                    rootContainer_1_mut = rootContainer_2;
                    containers_mut = mergeContainers(res_1.EmptyContainers);
                    calculationMode_1_mut = calculationMode_1;
                    items_1_mut = newItems;
                    results_mut = results_1;
                    batchCount_mut = batchCount_1;
                    retryCount_mut = retryCount_1;
                    continue loop;
                }
            }
            break;
        }
    };
    const outerLoop = (calculationMode_2_mut, items_2_mut, retryCount_2_mut, resList_mut) => {
        let inputRecord, inputRecord_1;
        outerLoop:
        while (true) {
            const calculationMode_2 = calculationMode_2_mut, items_2 = items_2_mut, retryCount_2 = retryCount_2_mut, resList = resList_mut;
            const defaultBatchSize_1 = ((length(items_2) < 100) ? 15 : 20) | 0;
            const res_3 = loop(rootContainer, singleton_1(rootContainer), calculationMode_2, items_2, empty_1(), defaultBatchSize_1, 6);
            let res_4;
            if (res_3.ItemsUnput.tail == null) {
                let patternInput_1;
                switch (calculationMode_2.tag) {
                    case 0: {
                        const maxLength = max_3(map((x_7) => op_Addition(x_7.Item.Dim.Length, x_7.Coord.Z), res_3.ItemsPut), {
                            Compare: compare,
                        });
                        patternInput_1 = [new Container((inputRecord = rootContainer.Dim, new Dim_3(inputRecord.Width, inputRecord.Height, maxLength)), rootContainer.Coord, rootContainer.Weight), maxLength];
                        break;
                    }
                    case 1: {
                        const maxHeight = max_3(map((x_9) => op_Addition(x_9.Item.Dim.Height, x_9.Coord.Y), res_3.ItemsPut), {
                            Compare: compare,
                        });
                        patternInput_1 = [new Container((inputRecord_1 = rootContainer.Dim, new Dim_3(inputRecord_1.Width, inputRecord_1.Height, maxHeight)), rootContainer.Coord, rootContainer.Weight), maxHeight];
                        break;
                    }
                    default: {
                        const maxLength = max_3(map((x_7) => op_Addition(x_7.Item.Dim.Length, x_7.Coord.Z), res_3.ItemsPut), {
                            Compare: compare,
                        });
                        patternInput_1 = [new Container((inputRecord = rootContainer.Dim, new Dim_3(inputRecord.Width, inputRecord.Height, maxLength)), rootContainer.Coord, rootContainer.Weight), maxLength];
                    }
                }
                const max = patternInput_1[1];
                const newRes = loop(patternInput_1[0], singleton_1(rootContainer), calculationMode_2, items_2, empty_1(), defaultBatchSize_1, 6);
                let pattern_matching_result_1;
                if (newRes.ItemsUnput.tail == null) {
                    if (compare(max, fromBits(0, 0, false)) > 0) {
                        pattern_matching_result_1 = 0;
                    }
                    else {
                        pattern_matching_result_1 = 1;
                    }
                }
                else {
                    pattern_matching_result_1 = 1;
                }
                switch (pattern_matching_result_1) {
                    case 0: {
                        const newContainer = (calculationMode_2.tag === 0) ? (new Container(new Dim_3(rootContainer.Dim.Width, rootContainer.Dim.Height, op_Subtraction(rootContainer.Dim.Length, max)), new Coordinates(fromBits(0, 0, false), fromBits(0, 0, false), max), 0)) : ((calculationMode_2.tag === 1) ? (new Container(new Dim_3(rootContainer.Dim.Width, op_Subtraction(rootContainer.Dim.Height, max), rootContainer.Dim.Length), new Coordinates(fromBits(0, 0, false), max, fromBits(0, 0, false)), 0)) : (new Container(new Dim_3(rootContainer.Dim.Width, rootContainer.Dim.Height, op_Subtraction(rootContainer.Dim.Length, max)), new Coordinates(fromBits(0, 0, false), fromBits(0, 0, false), max), 0)));
                        res_4 = (new CalcResult(newRes.ItemsPut, dimToVolume(rootContainer.Dim), newRes.ItemsUnput, newRes.PutVolume, rootContainer, mergeContainers(cons(newContainer, res_3.EmptyContainers))));
                        break;
                    }
                    case 1: {
                        res_4 = res_3;
                        break;
                    }
                }
            }
            else {
                res_4 = res_3;
            }
            const results_2 = cons(res_4, resList);
            const matchValue_3 = [compare(sw.ElapsedMilliseconds, fromBits(90000, 0, false)) > 0, res_4.ItemsUnput, retryCount_2];
            let pattern_matching_result_2;
            if (matchValue_3[0]) {
                pattern_matching_result_2 = 0;
            }
            else if (matchValue_3[2] === 0) {
                pattern_matching_result_2 = 0;
            }
            else if (matchValue_3[1].tail == null) {
                pattern_matching_result_2 = 1;
            }
            else {
                pattern_matching_result_2 = 2;
            }
            switch (pattern_matching_result_2) {
                case 0: {
                    return results_2;
                }
                case 1: {
                    return results_2;
                }
                case 2: {
                    const loopMutate = (items_3_mut, _arg3_mut) => {
                        let calcMode, itemsPut_2, items_5, firstSwap, maxId, secondSwap, arr, tmp, item_1, r, item_2, item_3, item_4;
                        loopMutate:
                        while (true) {
                            const items_3 = items_3_mut, _arg3 = _arg3_mut;
                            if (_arg3 === 0) {
                                return items_3;
                            }
                            else {
                                items_3_mut = (calcMode = calculationMode_2, (itemsPut_2 = res_4.ItemsPut, (items_5 = items_3, (items_5.tail == null) ? empty_1() : (firstSwap = ((((Math.random() > 0.6) ? true : (itemsPut_2.tail == null)) ? randomNext(0, length(items_5)) : (maxId = maxBy((calcMode.tag === 0) ? ((x_11) => x_11.Coord.Z) : ((calcMode.tag === 1) ? ((x_12) => x_12.Coord.Y) : ((x_11) => x_11.Coord.Z)), itemsPut_2, {
                                    Compare: compare,
                                }), findIndex((x_14) => (x_14.Id === maxId.Item.Id), items_5))) | 0), (secondSwap = (randomNext(0, length(items_5)) | 0), (arr = Array.from(items_5), (tmp = (item_1 = arr[firstSwap], (r = Math.random(), (r < 0.333) ? (item_2 = item_1, item_2.KeepTop ? item_2 : (new Item(new Dim_3(item_2.Dim.Height, item_2.Dim.Width, item_2.Dim.Length), item_2.Weight, item_2.Id, item_2.Tag, item_2.NoTop, item_2.KeepTop, item_2.KeepBottom))) : ((r < 0.666) ? (item_3 = item_1, new Item(new Dim_3(item_3.Dim.Length, item_3.Dim.Height, item_3.Dim.Width), item_3.Weight, item_3.Id, item_3.Tag, item_3.NoTop, item_3.KeepTop, item_3.KeepBottom)) : (item_4 = item_1, item_4.KeepTop ? item_4 : (new Item(new Dim_3(item_4.Dim.Width, item_4.Dim.Length, item_4.Dim.Height), item_4.Weight, item_4.Id, item_4.Tag, item_4.NoTop, item_4.KeepTop, item_4.KeepBottom)))))), (arr[firstSwap] = arr[secondSwap], (arr[secondSwap] = tmp, ofArray(arr))))))))));
                                _arg3_mut = (_arg3 - 1);
                                continue loopMutate;
                            }
                            break;
                        }
                    };
                    calculationMode_2_mut = (new CalculationMode(2));
                    items_2_mut = loopMutate(items_2, ~(~(length(items_2) / 10)));
                    retryCount_2_mut = (retryCount_2 - 1);
                    resList_mut = results_2;
                    continue outerLoop;
                }
            }
            break;
        }
    };
    const retryCount_3 = ((containerMode.tag === 1) ? 2 : 10) | 0;
    try {
        const res_5 = maxBy((x_17) => x_17.PutVolume, outerLoop(calculationMode, sortByDescending((x_15) => [x_15.KeepBottom, maxDim(x_15)], map((item_5) => Rotate_rotateToMinZ(calculationMode, item_5), items), {
            Compare: compareArrays,
        }), retryCount_3, empty_1()), {
            Compare: compare,
        });
        logger.Log("Result {@res}", [res_5]);
        return res_5;
    }
    catch (e) {
        logger.LogError(e);
        throw e;
    }
}

export function run(sw, logger, rootContainer, containerMode, calculationMode, items, T, alpha) {
    const T_1 = T;
    const loop = (results_mut, unputItems_mut) => {
        let inputRecord, inputRecord_1;
        loop:
        while (true) {
            const results = results_mut, unputItems = unputItems_mut;
            const res = runPerContainer(logger, sw, rootContainer, containerMode, calculationMode, unputItems, T_1, alpha);
            let res_1;
            if (res.ItemsUnput.tail == null) {
                let patternInput;
                switch (calculationMode.tag) {
                    case 0: {
                        const maxLength = max_3(map((x) => op_Addition(x.Item.Dim.Length, x.Coord.Z), res.ItemsPut), {
                            Compare: compare,
                        });
                        patternInput = [new Container((inputRecord = rootContainer.Dim, new Dim_3(inputRecord.Width, inputRecord.Height, maxLength)), rootContainer.Coord, rootContainer.Weight), maxLength];
                        break;
                    }
                    case 1: {
                        const maxHeight = max_3(map((x_2) => op_Addition(x_2.Item.Dim.Height, x_2.Coord.Y), res.ItemsPut), {
                            Compare: compare,
                        });
                        patternInput = [new Container((inputRecord_1 = rootContainer.Dim, new Dim_3(inputRecord_1.Width, maxHeight, inputRecord_1.Length)), rootContainer.Coord, rootContainer.Weight), maxHeight];
                        break;
                    }
                    default: {
                        const maxLength = max_3(map((x) => op_Addition(x.Item.Dim.Length, x.Coord.Z), res.ItemsPut), {
                            Compare: compare,
                        });
                        patternInput = [new Container((inputRecord = rootContainer.Dim, new Dim_3(inputRecord.Width, inputRecord.Height, maxLength)), rootContainer.Coord, rootContainer.Weight), maxLength];
                    }
                }
                if (equals_1(patternInput[1], fromBits(0, 0, false))) {
                    res_1 = res;
                }
                else {
                    const newRes = runPerContainer(logger, sw, patternInput[0], containerMode, calculationMode, unputItems, T_1, alpha);
                    res_1 = ((newRes.ItemsUnput.tail == null) ? (new CalcResult(newRes.ItemsPut, dimToVolume(rootContainer.Dim), newRes.ItemsUnput, newRes.PutVolume, rootContainer, newRes.EmptyContainers)) : res);
                }
            }
            else {
                res_1 = res;
            }
            const sumRes = cons(res_1, results);
            toConsole(printf("%A"))(containerMode);
            if (containerMode.tag === 0) {
                return sumRes;
            }
            else if (length(sumRes) > 20) {
                return sumRes;
            }
            else {
                const matchValue_2 = res_1.ItemsUnput;
                if (matchValue_2.tail == null) {
                    return sumRes;
                }
                else if (length(matchValue_2) === length(unputItems)) {
                    return sumRes;
                }
                else {
                    results_mut = sumRes;
                    unputItems_mut = res_1.ItemsUnput;
                    continue loop;
                }
            }
            break;
        }
    };
    return reverse(loop(empty_1(), items));
}

