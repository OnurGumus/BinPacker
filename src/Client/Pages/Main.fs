module Client.Pages.Main

open Feliz
open Fable.Core.JsInterop
open Browser.Dom
open System
open Browser.Types
open Fable
open Shared

type Model = NA
open Feliz.UseMediaQuery

let html : string =
    importDefault ("!!raw-loader!./_Pages/Main.html")

let initCanvas () =
    console.log ("init")
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
let MainView comp dispatch (model: Model) =
    React.useEffectOnce (initCanvas)
    let matches = React.useMediaQuery("(min-width: 1025px)")
    let attachShadowRoot, shadowRoot = Client.Util.useShadowRoot (html)

    let howto =
        Html.ul [
            prop.style [ style.listStyleType.disc ]

            let items =
                [
                    "Enter container and item dimensions between 1 and 2000, no decimals."
                    "Weight range is between 0 and 100,000."
                    "Add as many items as you want."
                    "If the item is not stackable (no other item is on top of this) uncheck \"Stack\" for that item."
                    "If the item must keep its upright then check \"⬆⬆\" for that item."
                    "If the item must be at the bottom (e.g, heavy items) then check \"⬇⬇\" for that item."
                    "All dimensions are unitless."
                    "Select the calculation mode depending on items to be at minimum height or pushed to the edge."
                    "Select container mode to multi container if you want to see how many container it takes to fit"
                    "Click calculate and wait up to 100 sec. And then click 3D Canvas button at the bottom to see the visuals."
                    "Bin packer will try to fit the items and minimize the placement."
                    "Gravity is ignored."
                    "Review the result in 3D then you may share it via share the result button and copy the url."
                    "You may visually remove some boxes by using h-filter and v-filter controls on 3D."
                    "For your questions and problems send a mail to onur@outlook.com.tr or tweet to @onurgumusdev."
                ]

            prop.children [
                for item in items do
                    Html.li [ prop.text item ]
            ]
        ]


    Interop.createElement
        "page-main"
        [
            attachShadowRoot
            prop.children [
                Html.div [
                    prop.slot "title"
                    prop.children[
                       Html.div[
                           prop.id "title"
                           prop.text "Bindrake - Your bin packing magician!"
                       ]
                    ]
                ]
                Html.div[
                    prop.id "canvas-wrapper"
                    prop.slot "my-canvas"
                    prop.children[
                        Html.canvas [
                            prop.id "my-canvas"
                        ]
                        Html.button[
                            prop.text "<< See parameters"
                            prop.className "nav-button"
                            prop.onClick(fun _ -> document.querySelector("#form")?scrollIntoView() )
                            prop.style [ if matches then style.visibility.collapse ]
                        ]
                    ]
                ]
                Html.div[
                    prop.id "help-wrapper"
                    prop.slot "help"
                    prop.children[
                        Html.div [
                            prop.id "help"
                            prop.children [
                                Html.h1[
                                    prop.text "How to use"
                                ]
                                howto
                            ]
                        ]
                        Html.button[
                            prop.text "Next >>"
                            prop.className "nav-button"
                            prop.onClick(fun _ -> document.querySelector("#form")?scrollIntoView() )
                            prop.style [ if matches then style.visibility.collapse ]
                        ]
                    ]
                ]
                Html.div [
                    prop.id "form-wrapper"
                    prop.slot "form"
                    prop.children[
                        Html.div[
                            prop.id "form"
                            prop.children[
                                comp
                            ]
                        ]
                        Html.div[
                            prop.className "button-panel"
                            prop.children[
                                Html.button[
                                    prop.className "nav-button"
                                    prop.text "<< Help"
                                    prop.onClick(fun _ -> document.querySelector("#help")?scrollIntoView() )
                                ]
                                Html.button[
                                    prop.className "nav-button"
                                    prop.text "3D Canvas >>"
                                    prop.onClick(fun _ -> document.querySelector("#my-canvas")?scrollIntoView() )
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
