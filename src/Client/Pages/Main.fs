module Client.Pages.Main
open Feliz
open Fable.Core.JsInterop
open Browser.Dom
open System
open Browser.Types
open Fable

type Model = NA

let html : string =
    importDefault ("!!raw-loader!./_Pages/Main.html")

[<ReactComponent>]
let TasksView dispatch (model: Model) =

    let attachShadowRoot, shadowRoot = Client.Util.useShadowRoot (html)

    Interop.createElement
        "bindrake-main"
        [
            attachShadowRoot
            prop.children [
                Html.div [
                   prop.slot "title"
                   prop.text "onur"
                ]
            ]
        ]