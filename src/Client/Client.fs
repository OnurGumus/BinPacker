module Client

open Elmish
open Elmish.React
open Fable.Core.JsInterop
open Client.Pages
open Client.Util
open Fable
open Fable.Core


#if DEBUG
open Elmish.Debug
open Elmish.HMR
open Browser.Dom
open Util
#endif

let baseCSS : string = importDefault ("!!raw-loader!./_Static/Base.css")
let modulesCSS : string = importDefault ("!!raw-loader!sass-loader!./_Static/Modules.scss")
let themeCSS : string = importDefault ("!!raw-loader!sass-loader!./_Static/Theme.scss")


Browser.Dom.document?adoptedStyleSheets <- [| baseCSS;modulesCSS;themeCSS |] |> Array.map createSheet

[<Emit("navigator.userLanguage  || (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || navigator.browserLanguage || navigator.systemLanguage || 'en'")>]
let lang:string =  jsNative

let langL = lang.ToLowerInvariant()

let langValue =
    if lang.StartsWith("tr") then Lang.TR
    elif lang.StartsWith "ru" then Lang.RU
    else
        Lang.EN

Program.mkProgram (Main.init) Main.update Main.MainView
#if DEBUG
|> Program.withConsoleTrace
#endif
|> Program.withReactBatched "elmish-app"
#if DEBUG
|> Program.withDebugger
#endif
|> Program.runWith langValue
