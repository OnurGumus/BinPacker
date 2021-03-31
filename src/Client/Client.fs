module Client

open Elmish
open Elmish.React
open Fable.Core.JsInterop
open Client.Pages


#if DEBUG
open Elmish.Debug
open Elmish.HMR
#endif

Program.mkProgram Main.init Main.update Main.MainView
#if DEBUG
|> Program.withConsoleTrace
#endif
|> Program.withReactBatched "elmish-app"
#if DEBUG
|> Program.withDebugger
#endif
|> Program.run
