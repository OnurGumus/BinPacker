module Client

open Elmish
open Elmish.React
open Fable.Core.JsInterop
open Client.Pages
open Client.Util



#if DEBUG
open Elmish.Debug
open Elmish.HMR
#endif

let baseCSS : string = importDefault ("!!raw-loader!./_Static/Base.css")
let modulesCSS : string = importDefault ("!!raw-loader!sass-loader!./_Static/Modules.scss")
let themeCSS : string = importDefault ("!!raw-loader!sass-loader!./_Static/Theme.scss")


Browser.Dom.document?adoptedStyleSheets <- [| baseCSS;modulesCSS;themeCSS |] |> Array.map createSheet


Program.mkProgram Main.init Main.update Main.MainView
#if DEBUG
|> Program.withConsoleTrace
#endif
|> Program.withReactBatched "elmish-app"
#if DEBUG
|> Program.withDebugger
#endif
|> Program.run
