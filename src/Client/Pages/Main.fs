module Client.Pages.Main
open Feliz
open Fable.Core.JsInterop
open Browser.Dom
open System
open Browser.Types
open Fable
open Shared

type Model = NA

let html : string =
    importDefault ("!!raw-loader!./_Pages/Main.html")

let initCanvas () =
    console.log("init")
    CanvasRenderer.init ()

    let colors =
        [
            "green"
            "blue"
            "red"
            "pink"
            "yellow"
            "aqua"
            "orange"
            "white"
            "purple"
            "lime"
        ]

    let boxes : ItemPut list =
        [
            for i = 0L to 9L do
                {
                    Coord =
                        {
                            X = i * 10L
                            Y = Math.Abs(5L - i) * 10L
                            Z = Math.Abs(5L - i) * 10L
                        }
                    Item =
                        {
                            Dim =
                                {
                                    Width = 10L
                                    Height = 10L
                                    Length = 10L
                                }
                            Tag = colors.[int i]
                            Id = i.ToString()
                            NoTop = false
                            KeepTop = false
                            Weight = 0
                            KeepBottom = false
                        }
                }
            for i = 0L to 9L do
                {
                    Coord =
                        {
                            X = (i * 10L)
                            Y = Math.Abs(5L - i) * 10L
                            Z = 90L - Math.Abs(5L - i) * 10L
                        }
                    Item =
                        {
                            Dim =
                                {
                                    Width = 10L
                                    Height = 10L
                                    Length = 10L
                                }
                            Tag = colors.[int i]
                            Id = i.ToString()
                            NoTop = false
                            KeepTop = false
                            KeepBottom = false
                            Weight = 0
                        }
                }
        ]

    let container : Container =
        {
            Dim =
                {
                    Width = 100L
                    Height = 100L
                    Length = 100L
                }
            Coord = { X = 0L; Y = 0L; Z = 0L }
            Weight = 0
        }
    CanvasRenderer.renderResult container boxes true
[<ReactComponent>]
let TasksView dispatch (model: Model) =
    React.useEffectOnce(initCanvas)
    let attachShadowRoot, shadowRoot = Client.Util.useShadowRoot (html)

    Interop.createElement
        "page-main"
        [
            attachShadowRoot
            prop.children [
                Html.div [
                   prop.slot "title"
                   prop.text "onur"
                ]
                Html.canvas [
                    prop.id "my-canvas"
                    prop.slot "my-canvas"
                ]
                Html.div [
                    prop.id "help"
                    prop.slot "help"
                    prop.text "help"
                ]
            ]
        ]