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
let themeCSS : string = importDefault ("!!raw-loader!./_Static/Theme.css")

let baseSheet = new CSSStyleSheet()
baseSheet?replaceSync (baseCSS)

let themeSheet = new CSSStyleSheet()
themeSheet?replaceSync (themeCSS)


Browser.Dom.document?adoptedStyleSheets <- [| baseSheet;themeSheet |]


Program.mkProgram Main.init Main.update Main.MainView
#if DEBUG
|> Program.withConsoleTrace
#endif
|> Program.withReactBatched "elmish-app"
#if DEBUG
|> Program.withDebugger
#endif
|> Program.run
