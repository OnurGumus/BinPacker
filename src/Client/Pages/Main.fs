module Client.Pages.Main

open Feliz
open Fable.Core.JsInterop
open Browser.Dom
open System
open Browser.Types
open Fable
open Shared
open Client
open Elmish
open Client.Util

type Model = { Form: Form.Model; Lang : Lang }

type Msg = FormMsg of Form.Msg

let init (lang : Lang) =
    let model, cmd = Form.init (lang)
    { Form = model; Lang = lang }, Cmd.map FormMsg cmd

let update msg (mainModel: Model) =
    match msg with
    | FormMsg msg ->
        let model, cmd = Form.update msg mainModel.Form
        { mainModel with Form = model }, Cmd.map FormMsg cmd

open Feliz.UseMediaQuery
open Client.Util

let html : string =
    importDefault ("!!raw-loader!./_Static/Main/index.html")

let layoutCSS : string =
    importDefault ("!!raw-loader!./_Static/Main/Layout.css")

let themeCSS : string =
    importDefault ("!!raw-loader!./_Static/Main/Theme.css")


let initCanvas () =
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
                            Rotation = false
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
                            Rotation = false
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
let MainView (model: Model) dispatch =
    let translate = Util.translate model.Lang
    let attachShadowRoot, shadowRoot = useShadowRoot (html)

    React.useEffect (
        (fun _ ->
            if shadowRoot.IsSome then
                shadowRoot.Value?adoptedStyleSheets <- [| layoutCSS; themeCSS |] |> Array.map createSheet

                (Fable.Core.JS.setTimeout initCanvas 100)
                |> ignore),

        [| shadowRoot |> box<_> |]
    )

    let matches =
        React.useMediaQuery ("(min-width: 1025px)")


    let howto =
        React.fragment [
            Html.h2 [
                prop.text ("How to use:" |> translate)
                prop.slot "help"
            ]
            Html.ul [
                prop.style [ style.listStyleType.disc ]
                prop.slot "help"

                let items =
                    [
                        "Enter container and item dimensions between 1 and 2000, no decimals."
                        "Weight range is between 0 and 100,000."
                        "Add as many items as you want."
                        "If the item is not stackable (no other item is on top of this) uncheck \"Stack\" for that item."
                        "If the item must keep its upright then check \"⬆\" for that item."
                        "If the item must be at the bottom (e.g, heavy items) then check \"⬇\" for that item."
                        "To prevent all kinds of rotation uncheck \"🔄\""
                        "All dimensions are unitless."
                        "Select the calculation mode depending on items to be at minimum height or pushed to the edge."
                        "Select container mode to multi container if you want to see how many container it takes to fit"
                        "Click calculate and wait up to 100 sec. And then click 3D Canvas button at the bottom to see the visuals."
                        "Gravity is ignored."
                        "You may share the result via share the result button and copy the url."
                        "You may visually remove some boxes by using h-filter and v-filter controls on 3D."
                        "For your questions and problems send a mail to onur@outlook.com.tr or tweet to @onurgumusdev."
                    ] |>  List.map translate

                prop.children [
                    for item in items do
                        Html.li [ prop.text item ]
                ]
            ]
        ]


    let formView =
        Client.Form.view model.Form (FormMsg >> dispatch)

    Interop.createElement
        "page-main"
        [
            attachShadowRoot
            prop.children [
                Html.div [
                    prop.slot "title"
                    prop.children [
                        Html.div [
                            prop.id "title"
                            prop.text ("Bindrake - Your bin packing magician!" |> translate)
                        ]
                    ]
                ]
                React.fragment [
                    Html.div [
                        prop.id "visual-filter"
                        prop.slot "my-canvas"
                    ]
                    Html.canvas [
                        prop.id "my-canvas"
                        prop.slot "my-canvas"
                    ]
                    Html.button [
                        prop.text "<< See parameters"
                        prop.slot "canvas-nav-button"
                        prop.className "nav-button"
                        prop.onClick (fun _ -> document.querySelector("[slot='form']")?scrollIntoView ())
                        prop.style [
                            if matches then
                                style.visibility.collapse
                        ]
                    ]
                ]
                howto
                Html.button [
                    prop.text ("Next >>" |> translate)
                    prop.slot "help-nav-button"
                    prop.className "nav-button"
                    prop.onClick (fun _ -> document.querySelector("[slot='form']")?scrollIntoView ())
                    prop.style [
                        if matches then
                            style.visibility.collapse
                    ]
                ]


                Html.div [
                    prop.id "form"
                    prop.slot "form"

                    prop.className "inner-wrapper"
                    prop.children [ formView ]
                ]

                Html.div [
                    prop.className "button-panel"
                    prop.slot "form-nav-button"
                    prop.children [
                        Html.button [
                            prop.className "nav-button"
                            prop.text ("<< Help" |> translate)
                            prop.onClick (fun _ -> document.querySelector("[slot='help']")?scrollIntoView ())
                        ]
                        Html.button [
                            prop.className "nav-button"
                            prop.text ("3D Canvas >>" |> translate)
                            prop.onClick (fun _ -> document.querySelector("[slot='my-canvas']")?scrollIntoView ())
                        ]
                    ]
                ]
            ]
        ]
