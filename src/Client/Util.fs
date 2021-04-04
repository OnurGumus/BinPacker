module Client.Util

open Feliz
open Fable.Core
open Fable.React.Helpers
open Fable.Core.JsInterop
open Browser.Types
open Fable.Core.JS

importAll "construct-style-sheets-polyfill"


[<Global>]
type CSSStyleSheet() =
    class
    end

let createSheet css =
    let sheet = new CSSStyleSheet()
    sheet?replaceSync (css)
    sheet

let useShadowRoot (html: string) =
    let (shadowRoot: HTMLElement option), setRootTag = React.useState (None)

    let attachShadowRoot =
        prop.ref
            (fun x ->
                if x <> null && shadowRoot.IsNone then
                    setRootTag (Some(x?attachShadow {| mode = "open" |})))

    React.useEffect (
        (fun () ->
            shadowRoot
            |> Option.iter (fun s -> s.innerHTML <- html)),
        [| shadowRoot |> box |]
    )

    attachShadowRoot, shadowRoot


type Lang = EN | TR | RU


let translate lang text =
    match lang with
    | EN -> text
    | TR ->
        match text with
        | "Stack" -> "İstif"
        | "Height" -> "Yüksek"
        | "Width" -> "Geniş"
        | "Length" -> "Uzun"
        | "Quant." -> "Adet"
        | "Weight" -> "Ağır"
        | "Max Weight" -> "Maks Ağır"
        | "Total Item Volume:" -> "Toplam Malzeme Hacmi:"
        | "Please complete the form." -> "Lütfen formu doldurun."
        | "Container volume:" -> "Konteyner hacmi:"
        | "Volume fit:" -> "Sığan hacim:"
        | "Calculation mode:" -> "Hesaplama modu:"
        | "Minimize Height" -> "Yusekliği minimize et"
        | "Minimize Length" -> "Uzunluğu minimize et"
        | "Container mode:" -> "Konteyner modu:"
        | "Single Container" -> "Tek Konteyner"
        | "Multi Container" -> "Coklu Konteyner"
        | "Calculating... (Max " -> "Hesaplıyor... (Maks "
        | "sec)" -> "saniye)"
        | "Items' volume exceeds single container volume." -> "Malzemelerin hacmi konteynerden büyük."
        | "First fill the form correctly!"  -> "Önce formu doldurun!"
        | "An item's parameters are larger than container's." -> "Bir malzemenin parametreleri konteynerden büyük!"
        | "Calculate" -> "Hesapla"
        | "All items put successfully! (See 3D Canvas)" -> "Tüm malzemeler sığdı! (3D Kanvasa bakın)"
        | "Unable to fit all items! (See 3D Canvas)" -> "Malzemeler sigmadi!"
        | "Could not fit the following items (See 3D canvas):" -> "Aşağıdaki malzemeler sığmadı! (3D Kanvasa bakın):"
        | " items not fit with this color." -> "bu renkteki malzeler sığmadı."
        | "Now copy the url from address bar and share it" -> "Şimdi adres çubuğundan adresi kopyalayıp payşalasabilirsiniz."
        | "Share the result" -> "Sonucu paylaşın!"
        | "Showing container: " -> "Gösterilen konteyner:"
        | "Max item L:" -> "Max Uz:"
        | ", H:" -> ", Yuk:"
        | "Enter CONTAINER dimensions:" -> "KONTEYNER ölçülerini girin:"
        | "Enter ITEM dimensions:"  -> "Malzeme ölçülerini girin:"
        | "Enter container and item dimensions between 1 and 2000, no decimals." -> "Konteyner ve malzeme ölçülerini 1 ila 2000 arasında ondalıksız girin."
        | "Weight range is between 0 and 100,000." -> "Ağırlık için 0 ila 100 000 arasinda bir rakam girin (opsiyonel)."
        | "Add as many items as you want." -> "Dilediğiniz kadar malzeme ekleyin."
        | "If the item is not stackable (no other item is on top of this) uncheck \"Stack\" for that item."
            -> "Eğer malezeme istifsiz ise o malzeme için İstif seçimini kaldırın."
        | "If the item must keep its upright then check \"⬆\" for that item." ->  "Eğer malzemenin üstü hep yukarıya bakacaksa \"⬆\"i seçin."
        | "If the item must be at the bottom (e.g, heavy items) then check \"⬇\" for that item." -> "Eğer malzeme altta kalmalıysa (ağır malzemeler) o zaman o malzeme için  \"⬇\"i seçin."
        | "To prevent all kinds of rotation uncheck \"🔄\"" -> "Malzeme hiçbir şekilde dönmesin istiyosanız \"🔄\"dan seçimi kaldırın."
        | "All dimensions are unitless." -> "Tüm ölçüler birimsizdir."
        | "Select the calculation mode depending on items to be at minimum height or pushed to the edge." -> "Yükseliği minimize etmek ya da malzemeleri kenara itmek için Hesaplama modunu değiştirebilirsiniz."
        | "Select container mode to multi container if you want to see how many container it takes to fit" -> "Eğer malzemeler bir konteynıra sığmayacaksa ve malzemelerin toplam kaç konteynera sığacağını görmek istiyosanız çoklu konteynerı seçin."
        | "Click calculate and wait up to 100 sec. And then click 3D Canvas button at the bottom to see the visuals." -> "Hesaplaya basın ve en fazla 100 s. bekleyin. Daha sonra 3D Kanvas üzerinden malzemelerin yerleşimini 3 boyutlu görebilirsiniz."
        | "Gravity is ignored." -> "Yerçekimi ihmal dahilindedir."
        | "You may share the result via share the result button and copy the url." -> "Sonuçları 'Sonucu paylaş' düğmesinden akabinde adresi kopyayalayarak başkalarıyla payşalabilirsiniz."
        | "You may visually remove some boxes by using h-filter and v-filter controls on 3D." -> "3 boyutlu görselde h-filter and v-filter üzerinden görsel fıltreleme yapabilirsiniz."
        | "For your questions and problems send a mail to onur@outlook.com.tr or tweet to @onurgumusdev." -> "Sorularınız ve önerileriniz için onur@outlook.com.tr adresine mail atın."
        | "How to use:" -> "Nasıl kullanılır?"
        | "Bindrake - Your bin packing magician!" -> "Bindrake - Kutu yerleştirme sihirbazınız!"
        | "<< Help" -> "<< Yardım"
        | "3D Canvas >>" -> "3D Kanvas >>"
        | "Next >>" -> "Devam"
        | other -> console.log("no translation for" + other); other


