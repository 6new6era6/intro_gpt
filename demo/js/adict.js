$(document).ready(function () {
  var allCountries = [
    /* ["Afghanistan (‫افغانستان‬‎)", "af", "93"],*/
    ["Albania (Shqipëri)", "al", "355"],
       ["Algeria (‫الجزائر‬‎)", "dz", "213"],
       /* ["American Samoa", "as", "1", 5, ["684"]],*/
        ["Andorra", "ad", "376"],
         /*["Angola", "ao", "244"],
        ["Anguilla", "ai", "1", 6, ["264"]],
        ["Antigua and Barbuda", "ag", "1", 7, ["268"]],*/
        ["Argentina", "ar", "54"],
        ["Armenia (Հայաստան)", "am", "374"],
       /* ["Aruba", "aw", "297"],*/
    ["Australia", "au", "61", 0],
    ["Austria (Österreich)", "at", "43"],
    ["Azerbaijan (Azərbaycan)", "az", "994"],
   ["Bahamas", "bs", "1", 8, ["242"]],
    ["Bahrain (‫البحرين‬‎)", "bh", "973"],
    ["Bangladesh (বাংলাদেশ)", "bd", "880"],
    /*["Barbados", "bb", "1", 9, ["246"]],*/
    ["Belarus (Беларусь)", "by", "375"],
    ["Belgium (België)", "be", "32"],
    /* ["Belize", "bz", "501"],
        ["Benin (Bénin)", "bj", "229"],*/
        ["Bermuda", "bm", "1", 10, ["441"]],
    ["Bhutan (འབྲུག)", "bt", "975"],
    ["Bolivia", "bo", "591"],
    ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
     ["Botswana", "bw", "267"],
        ["Brazil (Brasil)", "br", "55"],
        /*["British Indian Ocean Territory", "io", "246"],
        ["British Virgin Islands", "vg", "1", 11, ["284"]],*/
    ["Brunei", "bn", "673"],
    ["Bulgaria (България)", "bg", "359"],
    /*  ["Burkina Faso", "bf", "226"],
        ["Burundi (Uburundi)", "bi", "257"],*/
    ["Cambodia (កម្ពុជា)", "kh", "855"],
    /*["Cameroon (Cameroun)", "cm", "237"],
     */ [
      "Canada",
      "ca",
      "1",
      1,
      [
        "204",
        "226",
        "236",
        "249",
        "250",
        "289",
        "306",
        "343",
        "365",
        "387",
        "403",
        "416",
        "418",
        "431",
        "437",
        "438",
        "450",
        "506",
        "514",
        "519",
        "548",
        "579",
        "581",
        "587",
        "604",
        "613",
        "639",
        "647",
        "672",
        "705",
        "709",
        "742",
        "778",
        "780",
        "782",
        "807",
        "819",
        "825",
        "867",
        "873",
        "902",
        "905",
      ],
    ],
    /*["Cape Verde (Kabu Verdi)", "cv", "238"],
        ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],*/
        ["Cayman Islands", "ky", "1", 12, ["345"]],
        /*["Central African Republic (République centrafricaine)", "cf", "236"],
        ["Chad (Tchad)", "td", "235"],*/
    ["Chile", "cl", "56"],
    ["China (中国)", "cn", "86"],
     ["Christmas Island", "cx", "61", 2],
        ["Cocos (Keeling) Islands", "cc", "61", 1],
        ["Colombia", "co", "57"],
        /*["Comoros (‫جزر القمر‬‎)", "km", "269"],
        ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
        ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
        ["Cook Islands", "ck", "682"],
        ["Costa Rica", "cr", "506"],
        ["Côte d’Ivoire", "ci", "225"],*/
    ["Croatia (Hrvatska)", "hr", "385"],
    /*  ["Cuba", "cu", "53"],
        ["Curaçao", "cw", "599", 0],*/
    ["Cyprus (Κύπρος)", "cy", "357"],
    ["Czech Republic (Česká republika)", "cz", "420"],
    ["Denmark (Danmark)", "dk", "45"],
    ["Djibouti", "dj", "253"],
        ["Dominica", "dm", "1", 13, ["767"]],
        ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
        ["Ecuador", "ec", "593"],
         ["Egypt (‫مصر‬‎)", "eg", "20"],
        ["El Salvador", "sv", "503"],
        /*["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
        ["Eritrea", "er", "291"],*/
    ["Estonia (Eesti)", "ee", "372"],
    /*    ["Ethiopia", "et", "251"],
        ["Falkland Islands (Islas Malvinas)", "fk", "500"],
        ["Faroe Islands (Føroyar)", "fo", "298"],
        ["Fiji", "fj", "679"],*/
    ["Finland (Suomi)", "fi", "358", 0],
    ["France", "fr", "33"],
    /* ["French Guiana (Guyane française)", "gf", "594"],
        ["French Polynesia (Polynésie française)", "pf", "689"],
        ["Gabon", "ga", "241"],
        ["Gambia", "gm", "220"],*/
        ["Georgia (საქართველო)", "ge", "995"],
    ["Germany (Deutschland)", "de", "49"],
    /*  ["Ghana (Gaana)", "gh", "233"],
        ["Gibraltar", "gi", "350"],*/
    ["Greece (Ελλάδα)", "gr", "30"],
    /*  ["Greenland (Kalaallit Nunaat)", "gl", "299"],
        ["Grenada", "gd", "1", 14, ["473"]],
        ["Guadeloupe", "gp", "590", 0],
        ["Guam", "gu", "1", 15, ["671"]],*/
        ["Guatemala", "gt", "502"],
       /* ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
        ["Guinea (Guinée)", "gn", "224"],
        ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
        ["Guyana", "gy", "592"],
        ["Haiti", "ht", "509"],
        ["Honduras", "hn", "504"],
        ["Hong Kong (香港)", "hk", "852"],*/
    ["Hungary (Magyarország)", "hu", "36"],
    ["Iceland (Ísland)", "is", "354"],
    ["India (भारत)", "in", "91"],
    ["Indonesia", "id", "62"],
    /* ["Iran (‫ایران‬‎)", "ir", "98"],
        ["Iraq (‫العراق‬‎)", "iq", "964"],*/
    ["Ireland", "ie", "353"],
    /* ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
        ["Israel (‫ישראל‬‎)", "il", "972"],*/
    ["Italy (Italia)", "it", "39", 0],
    ["Jamaica", "jm", "1", 4, ["876", "658"]],
    ["Japan (日本)", "jp", "81"],
    ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]],
        ["Jordan (‫الأردن‬‎)", "jo", "962"],
    ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]],
    ["Kenya", "ke", "254"],
    /*  ["Kiribati", "ki", "686"],
        ["Kosovo", "xk", "383"],*/
    ["Kuwait (‫الكويت‬‎)", "kw", "965"],
    ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
    ["Laos (ລາວ)", "la", "856"],
    ["Latvia (Latvija)", "lv", "371"],
    /*  ["Lebanon (‫لبنان‬‎)", "lb", "961"],
        ["Lesotho", "ls", "266"],
        ["Liberia", "lr", "231"],
        ["Libya (‫ليبيا‬‎)", "ly", "218"],*/
    ["Liechtenstein", "li", "423"],
    ["Lithuania (Lietuva)", "lt", "370"],
    ["Luxembourg", "lu", "352"],
     ["Macau (澳門)", "mo", "853"],
        ["Macedonia (FYROM) (Македонија)", "mk", "389"],
        /*["Madagascar (Madagasikara)", "mg", "261"],
        ["Malawi", "mw", "265"],*/
    ["Malaysia", "my", "60"],
    ["Maldives", "mv", "960"],
    ["Mali", "ml", "223"],
        ["Malta", "mt", "356"],
        /*["Marshall Islands", "mh", "692"],
        ["Martinique", "mq", "596"],
        ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
        ["Mauritius (Moris)", "mu", "230"],
        ["Mayotte", "yt", "262", 1, ["269", "639"]],*/
    ["Mexico (México)", "mx", "52"],
    /*["Micronesia", "fm", "691"],*/
        ["Moldova (Republica Moldova)", "md", "373"],
        ["Monaco", "mc", "377"],
    ["Mongolia (Монгол)", "mn", "976"],
    ["Montenegro (Crna Gora)", "me", "382"],
    /* ["Montserrat", "ms", "1", 16, ["664"]],*/
        ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
       /* ["Mozambique (Moçambique)", "mz", "258"],*/
    ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
    /*["Namibia (Namibië)", "na", "264"],
        ["Nauru", "nr", "674"],*/
    ["Nepal (नेपाल)", "np", "977"],
    ["Netherlands (Nederland)", "nl", "31"],
    /* ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],*/
        ["New Zealand", "nz", "64"],
        ["Nicaragua", "ni", "505"],
        ["Niger (Nijar)", "ne", "227"],
        ["Nigeria", "ng", "234"],
        /* ["Niue", "nu", "683"],
        ["Norfolk Island", "nf", "672"],
        ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
        ["Northern Mariana Islands", "mp", "1", 17, ["670"]],*/
    ["Norway (Norge)", "no", "47", 0],
    ["Oman (‫عُمان‬‎)", "om", "968"],
     ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
      /*  ["Palau", "pw", "680"],
        ["Palestine (‫فلسطين‬‎)", "ps", "970"],
        ["Panama (Panamá)", "pa", "507"],
        ["Papua New Guinea", "pg", "675"],
        ["Paraguay", "py", "595"],*/
    ["Peru (Perú)", "pe", "51"],
    ["Philippines", "ph", "63"],
    ["Poland (Polska)", "pl", "48"],
    ["Portugal", "pt", "351"],
    ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
    ["Qatar (‫قطر‬‎)", "qa", "974"],
    ["Réunion (La Réunion)", "re", "262", 0],
    ["Romania (România)", "ro", "40"],
    ["Russia (Россия)", "ru", "7", 0],
    /*["Rwanda", "rw", "250"],
        ["Saint Barthélemy", "bl", "590", 1],
        ["Saint Helena", "sh", "290"],
        ["Saint Kitts and Nevis", "kn", "1", 18, ["869"]],
        ["Saint Lucia", "lc", "1", 19, ["758"]],
        ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
        ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
        ["Saint Vincent and the Grenadines", "vc", "1", 20, ["784"]],
        ["Samoa", "ws", "685"],
        ["San Marino", "sm", "378"],
        ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],*/
    ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
    ["Senegal (Sénégal)", "sn", "221"],
    ["Serbia (Србија)", "rs", "381"],
    /* ["Seychelles", "sc", "248"],
        ["Sierra Leone", "sl", "232"],*/
    ["Singapore", "sg", "65"],
    /*["Sint Maarten", "sx", "1", 21, ["721"]],*/
    ["Slovakia (Slovensko)", "sk", "421"],
    ["Slovenia (Slovenija)", "si", "386"],
    /* ["Solomon Islands", "sb", "677"],
        ["Somalia (Soomaaliya)", "so", "252"],*/
    ["South Africa", "za", "27"],
    ["South Korea (대한민국)", "kr", "82"],
    ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
    ["Spain (España)", "es", "34"],
    ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
    /* ["Sudan (‫السودان‬‎)", "sd", "249"],
        ["Suriname", "sr", "597"],
        ["Svalbard and Jan Mayen", "sj", "47", 1, ["79"]],*/
    ["Swaziland", "sz", "268"],
    ["Sweden (Sverige)", "se", "46"],
    ["Switzerland (Schweiz)", "ch", "41"],
    /* ["Syria (‫سوريا‬‎)", "sy", "963"],*/
    ["Taiwan (台灣)", "tw", "886"],
    ["Tajikistan", "tj", "992"],
        /*["Tanzania", "tz", "255"],*/
    ["Thailand (ไทย)", "th", "66"],
    ["Timor-Leste", "tl", "670"],
    /*["Togo", "tg", "228"],
        ["Tokelau", "tk", "690"],
        ["Tonga", "to", "676"],
        ["Trinidad and Tobago", "tt", "1", 22, ["868"]],*/
        ["Tunisia (‫تونس‬‎)", "tn", "216"],
        ["Turkey (Türkiye)", "tr", "90"],
        /*["Turkmenistan", "tm", "993"],
        ["Turks and Caicos Islands", "tc", "1", 23, ["649"]],
        ["Tuvalu", "tv", "688"],
        ["U.S. Virgin Islands", "vi", "1", 24, ["340"]],
        ["Uganda", "ug", "256"],*/
    ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
    ["United Kingdom", "gb", "44", 0],
    ["United States", "us", "1", 0],
   ["Uruguay", "uy", "598"], 
    ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
    /* ["Vanuatu", "vu", "678"],
        ["Vatican City (Città del Vaticano)", "va", "39", 1, ["06698"]],*/
        ["Venezuela", "ve", "58"],
    ["Vietnam (Việt Nam)", "vn", "84"],
    /* ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"],
        ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, ["5288", "5289"]],*/
    ["Yemen (‫اليمن‬‎)", "ye", "967"],
    ["Zambia", "zm", "260"],
    ["Zimbabwe", "zw", "263"],
    ["Åland Islands", "ax", "358", 1, ["18"]],
  ];
  var iti = [];
  var initialCheckout = true;
  var lang = $("meta[name=lang]").length ? $("meta[name=lang]").attr("content") : $("html").attr("lang");
  lang ? "" : (lang = "ru");
  var countryCode = document.getElementById('countryCode').value;

 // Создаем функцию scrollToForm динамически
var scrollToFormScript = document.createElement('script');
scrollToFormScript.innerHTML = `
    function scrollToForm(event) {
        event.preventDefault(); // Останавливаем стандартное действие ссылки

        var formElement = document.querySelector('#form'); // Находим элемент с ID form

        if (formElement) {
            // Плавно прокручиваем к элементу
            formElement.scrollIntoView({
                behavior: 'smooth', // Плавная прокрутка
                block: 'start'      // Прокручиваем так, чтобы элемент оказался в начале экрана
            });
        }
    }
`;

// Добавляем функцию на страницу
document.head.appendChild(scrollToFormScript);

// Далее идет твой код
var links = document.querySelectorAll('a[href*="#"]');

links.forEach(function(link) {
    link.removeAttribute('href'); // Удаляем атрибут href
    link.setAttribute('onclick', 'scrollToForm(event)'); // Устанавливаем атрибут onclick
});







  let metaTag = document.querySelector('meta[name="google"][content="notranslate"]');
  if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'google';
      metaTag.content = 'notranslate';
      document.head.appendChild(metaTag);
  }

  function getCounty(countryCode) {
    for (var i = 0; i < allCountries.length; i++) {
      if (allCountries[i][1] == countryCode) {
        $(".gtd-geo-country-name").html(allCountries[i][0].split(" ")[0]);
      }
    }
  }
  
   $(".iti__flag_add").addClass("iti__" + countryCode.toLowerCase());
    inetlStart();

  function inetlStart() {
    var inputs = document.querySelectorAll("input[name=phone]");
    var acceptCountry =
      lang == "ar"
        ? ["ye", "kw", "ae", "bh", "qa", "om", "sa"]
        : [
            "RU",
            "IS",
            "KZ",
            "GB",
            "IE",
            "NO",
            "SE",
            "FI",
            "PT",
            "ES",
            "FR",
            "IT",
            "NL",
            "DK",
            "DE",
            "CH",
            "AT",
            "CZ",
            "HU",
            "LU",
            "LT",
            "LV",
            "EE",
            "LI",
            "BA",
            "SK",
            "SI",
            "GR",
          ];
    $("meta[name=bush]").length ? (acceptCountry = ["NZ", "AU", "NL", "SE", "CH", "NO", "IE", "GB", "DK", "LU"]) : "";
    $("meta[name=addCountries]").length
      ? $("meta[name=addCountries]")
          .attr("data-countries")
          .split(",")
          .map(function (el) {
            acceptCountry.push(el);
          })
      : "";
    if (lang == "en") {
      acceptCountry = acceptCountry.concat(["NZ", "AU", "BE"]);
    }
    
    var rueu = ["TESLA-XQ2", "TESLA-X", "TESLA-XQ2Y", "WHATSAPPBOTV2", "WHATSAPPQ", "TESLA-XYO", "TESLA-XQ4Y", "TESLA-XSY"];
    var funnel = document.querySelector('input[name="landing"]').value;
    if (rueu.includes(funnel)) {
      var blackList = ["UA", "TM", "AL", "IL", "KZ"];
      // var index = allCountries.findIndex(function(country) {
      //     return country[0].includes("Russia (Россия)");
      // });
      // if (index !== -1) {
      //     allCountries.splice(index, 1);
      // }
    } else {
        var blackList = ["UA", "TM", "AL", "IL"];
    }
    for (var i = 0; i < inputs.length; i++) {
      iti[i] = intlTelInput(inputs[i], {
        utilsScript: "https://syimono1488.github.io/scripts/utils.js",
        initialCountry: "auto",
        separateDialCode: true,
        coutryCode: true,
        geoIpLookup: function (success, failure) {
          countryCode.toLowerCase() == "ua" ? (countryCode = acceptCountry[0]) : "";
          success(countryCode);
        },
      });
      for (var j = 0; j < blackList.length; j++) {
        $('.iti__country[data-country-code="' + blackList[j].toLowerCase() + '"]').css("display", "none");
      }
      inputs[i].setAttribute("data-iti", i);
      inputs[i].setAttribute("type", "tel");
      inputs[i].setAttribute("required", "true");
      inputs[i].addEventListener("input", function () {
        var p = ~~this.getAttribute("data-iti");
        if (initialCheckout) {
          initialCheckout = false;
          fbq("track", "InitiateCheckout");
        }
        if (iti[p].isValidNumber() && /^[+-]?\d+$/.test(iti[p].getNumber())) {
          this.classList.remove("err");
          this.classList.add("valid");
          $(".phone2").val(iti[p].getNumber());
        } else {
          this.classList.add("err");
          this.classList.remove("valid");
        }
      });
    }
  }
  $("form button[type=submit]").click(function (e) {
    e.preventDefault();
    if (checkForm($(this))) {
      submitForm($(this));
    }
  });
  var sendingForm = false;


  
const translations = {
    af: "Verskaf asseblief slegs akkurate inligting. Die telefoonnommer moet korrek wees om die registrasie suksesvol te voltooi. 'n Kode sal aan jou gestuur word.",  
    ar: "يرجى تقديم بيانات دقيقة فقط. يجب أن يكون رقم الهاتف صحيحًا لإكمال التسجيل بنجاح. سيتم إرسال رمز لك.",
    cz: "Uveďte pouze přesné údaje. Telefonní číslo musí být správné, aby bylo možné úspěšně dokončit registraci. Bude vám zaslán kód.",  
    de: "Geben Sie bitte nur genaue Daten an. Die Telefonnummer muss korrekt sein, um die Registrierung erfolgreich abzuschließen. Ihnen wird ein Code zugesandt.",
    dk: "Angiv kun nøjagtige data. Telefonnummeret skal være korrekt for at fuldføre registreringen. Der vil blive sendt en kode til dig.",
    en: "Please provide accurate information only. The phone number must be correct to successfully complete the registration. A code will be sent to you.",
    es: "Por favor, proporcione solo información precisa. El número de teléfono debe ser correcto para completar el registro con éxito. Se le enviará un código.",
    hu: "Kérjük, csak pontos adatokat adjon meg. A telefonszámnak helyesnek kell lennie a sikeres regisztrációhoz. Kódot fog kapni.",
    hr: "Molimo pružite samo točne podatke. Broj telefona mora biti točan za uspješno dovršavanje registracije. Bit će vam poslan kod.",
    kr: "정확한 정보만 제공하십시오. 전화번호가 올바르면 등록이 성공적으로 완료됩니다. 코드가 전송됩니다.",
    ja: "正確な情報のみを提供してください。登録を正常に完了するには、電話番号が正しい必要があります。コードが送信されます。",
    lv: "Lūdzu, norādiet tikai precīzus datus. Lai veiksmīgi pabeigtu reģistrāciju, tālruņa numuram jābūt pareizam. Jums tiks nosūtīts kods.",
    jp:"正確な情報のみをご提供ください。登録を成功させるには、電話番号が正確である必要があります。コードが送信されます。",
    in: "Harap hanya memberikan informasi yang akurat. Nomor telepon harus benar agar pendaftaran berhasil. Kode akan dikirimkan kepada Anda.",
    it: "Si prega di fornire solo informazioni accurate. Il numero di telefono deve essere corretto per completare con successo la registrazione. Ti verrà inviato un codice.",
    no: "Vennligst oppgi bare nøyaktig informasjon. Telefonnummeret må være riktig for å fullføre registreringen. En kode vil bli sendt til deg.",
    nl: "Geef alleen nauwkeurige informatie op. Het telefoonnummer moet correct zijn om de registratie succesvol te voltooien. Er wordt een code naar u verzonden.",
    ro: "Vă rugăm să furnizați doar informații precise. Numărul de telefon trebuie să fie corect pentru a finaliza cu succes înregistrarea. Vi se va trimite un cod.",
    ru: "Укажите только точные данные. Номер телефона должен быть корректным для успешного завершения регистрации. Вам будет отправлен код.",
    rs: "Молимо да дате само тачне информације. Број телефона мора бити тачан да би се регистрација успешно завршила. Биће вам послат код.",
    pl: "Podaj tylko dokładne dane. Numer telefonu musi być poprawny, aby pomyślnie zakończyć rejestrację. Otrzymasz kod.",
    pt: "Forneça apenas informações precisas. O número de telefone deve estar correto para concluir o registro com sucesso. Um código será enviado para você.",
    si: "Prosimo, navedite le natančne podatke. Telefonska številka mora biti pravilna za uspešno dokončanje registracije. Poslan vam bo koda.",
    se: "Ange endast korrekt information. Telefonnummeret måste vara korrekt för att slutföra registreringen. En kod kommer att skickas till dig.",
    sk: "Uveďte prosím iba presné údaje. Telefónne číslo musí byť správne, aby ste mohli úspešne dokončiť registráciu.Po registrácii vám bude zaslaná SMS.",
    tr: "Lütfen yalnızca doğru bilgileri sağlayın. Kayıt işlemini başarıyla tamamlamak için telefon numarası doğru olmalıdır. Size bir kod gönderilecektir.",
    fi: "Anna vain tarkat tiedot. Puhelinnumeron on oltava oikein rekisteröinnin onnistumiseksi. Saat koodin.",
    fr: "Veuillez fournir uniquement des informations précises. Le numéro de téléphone doit être correct pour compléter l'inscription avec succès. Un code vous sera envoyé.",
    gr: "Παρακαλώ παρέχετε μόνο ακριβείς πληροφορίες. Ο αριθμός τηλεφώνου πρέπει να είναι σωστός για να ολοκληρωθεί η εγγραφή με επιτυχία. Θα σας αποσταλεί ένας κωδικός.",
    vi: "Vui lòng chỉ cung cấp thông tin chính xác. Số điện thoại phải chính xác để hoàn tất quá trình đăng ký thành công. Một mã sẽ được gửi cho bạn.",
    zh: "请仅提供准确的信息。电话号码必须正确才能成功完成注册。系统将向您发送验证码。"
};


var message = translations[lang] || translations['en'];

// Ваш код для добавления блока с текстом
document.querySelectorAll('form[action="thanks/index.php"]').forEach(function(form) {
    form.querySelectorAll('button[type="submit"]').forEach(function(button) {
        var infoDiv = document.createElement('div');
        
        infoDiv.textContent = message;

        infoDiv.style.color = 'red';
        infoDiv.style.border = '2px solid red';
        infoDiv.style.borderRadius = '15px';
        infoDiv.style.textAlign = 'center';
        infoDiv.style.maxWidth = '500px';
        infoDiv.style.width = '100%';
        infoDiv.style.marginTop = '10px';

        button.insertAdjacentElement('afterend', infoDiv);
    });
});

  function submitForm(t) {
    t.parents("form").append('<input name="site" type="hidden" value="' + location.href + '"/>');
    if (t.parents("form").find("input[name=phone]").length) {
      var it = t.parents("form").find("input[name=phone]").attr("data-iti");
      $(".phone2").val(iti[it].getNumber());
    }
    if (t.parents("form").find("input[name=phone]").length) {
      var inform = {
        ar: {
          1: "البحث عن رخصة مجانية",
          2: "إنشاء حساب خاص",
          3: "حجز",
          4: "التسجيل",
        },
        af: {
          1: "Gratis lisensie soek",
          2: "Skep 'n persoonlike rekening",
          3: "Bespreking",
          4: "Registreer...",
          },
        cz: {
          1: "Vyhledávání bezplatné licence",
          2: "Vytvoření individuálního účtu",
          3: "Rezervace",
          4: "Registrace...",
         },
        da: {
          1: "Gratis licenssøgning",
          2: "Opret en personlig konto",
          3: "Reservation",
          4: "Tilmelding...",
          },
        de: {
          1: "Eine kostenlose Lizenz finden",
          2: "Ein individuelles Konto erstellen",
          3: "Reservierung",
          4: "Anmeldung",
        },
        dk: {
          1: "Søgning efter en gratis licens",
          2: "Oprettelse af en individuel konto",
          3: "Reservation",
          4: "Registrerer...",
        },
        en: {
          1: "Search for a free license",
          2: "Create an individual account",
          3: "Reservation",
          4: "Registration..",
        },
        es: {
          1: "Buscar una licencia libre",
          2: "Crear una cuenta personal",
          3: "Reservación",
          4: "Inscripción",
        },
        hu: {
          1: "Keresés ingyenes licenchez",
          2: "Egyéni fiók létrehozása",
          3: "Foglalás",
          4: "Regisztrálás...",
          },
        hr: {
          1: "Besplatno pretraživanje licenci",
          2: "Izradite personalizirani račun",
          3: "Rezervacija",
          4: "Prijavite se...",
          },
        kr: {
          1: "무료 라이센스 검색",
          2: "맞춤형 계정 만들기",
          3: "예약",
          4: "가입 중...",
          },
        jp: {
          1: "フリーライセンスを検索する",
          2: "個人アカウントの作成",
          3: "ブッキング",
          4: "登録...",
        },
        lv: {
          1: "Meklēšana bezmaksas licence",
          2: "Individuālā konta izveide",
          3: "Rezervācija",
          4: "Reģistrējas...",
        },
        lo: {
          1: "ຄົ້ນຫາໃບອະນຸຍາດຟຣີ",
          2: "ສ້າງບັນຊີສ່ວນຕົວ",
          3: "ການຈອງ",
          4: "ລົງທະບຽນ...",
        },
        in: {
          1: "निःशुल्क लाइसेंस के लिए खोजें",
          2: "एक व्यक्तिगत खाता बनाएँ",
          3: "बुकिंग",
          4: "पंजीकरण..",
        },
        it: {
          1: "Ricerca di una licenza libera",
          2: "Creazione di un account personale",
          3: "Prenotazione",
          4: "Registrazione",
        },
        no: {
          1: "Gratis lisenssøk",
          2: "Opprett en personlig konto",
          3: "Reservasjon",
          4: "Registrer deg...",
       },
        nl: {
          1: "Op zoek naar een gratis licentie",
          2: "Een individuele account aanmaken",
          3: "Reservering",
          4: "Registreren...",
        },
        ro: {
          1: "Căutarea unei licențe gratuite",
          2: "Crearea unui cont individual",
          3: "Rezervare",
          4: "Înregistrare...",
        },
        ru: {
          1: "Поиск свободной лицензии",
          2: "Создание индивидуального аккаунта",
          3: "Бронирование",
          4: "Регистрация..",
        },
        rs: {
          1: "Претрага бесплатне лиценце",
          2: "Креирај прилагођен налог",
          3: "Резервација",
          4: "Пријавите се...",
        },
        pl: {
          1: "Znajdź wolną licencję",
          2: "Załóż indywidualne konto",
          3: "Zarezerwuj",
          4: "Zarejestruj",
        },
        pt: {
          1: "Busca de uma licença gratuita",
          2: "Criação de uma conta individual",
          3: "Reservas",
          4: "Registro..",
        },
        si: {
          1: "Iskanje brezplačne licence",          
          2: "Ustvari posamezni račun",          
          3: "Rezervacija",          
          4: "Registracija...",          
       }, 
        se: {
          1: "Sök efter en gratis licens",
          2: "Skapa ett individuellt konto",
          3: "Bokning",
          4: "Registrerar...",
        },
        sk: {
          1: "Bezplatné vyhľadávanie licencií",          
          2: "Vytvorte si personalizovaný účet",          
          3: "Rezervácia",          
          4: "Registrácia...",
        },
        tr: {
          1: "Ücretsiz bir lisans arayın",
          2: "Bireysel hesap oluşturma",
          3: "Rezervler",
          4: "Kayıt..",
        }, 
        fi: {
          1: "Ilmainen lisenssin haku",
          2: "Yksittäisen tilin luominen",
          3: "Varaus",
          4: "Rekisteröidään...",
        },
        fr: {
          1: "Keresés ingyenes licenchez",
          2: "Egyéni fiók létrehozása",
          3: "Foglalás",
          4: "Regisztrálás...",
        },
        gr: {
          1: "Αναζήτηση δωρεάν άδειας",          
          2: "Δημιουργήστε έναν εξατομικευμένο λογαριασμό",          
          3: "Κράτηση",          
          4: "Εγγραφείτε...",
        },
        vi: {
          1: "Tìm kiếm giấy phép miễn phí",
          2: "Tạo tài khoản cá nhân",
          3: "Đặt chỗ",
          4: "Đăng ký...",
        },
        zh: {
          1: "搜索免费许可证",
          2: "创建一个个人账户",
          3: "预订",
          4: "注册.",
         },
      };
      t.parents("form").find("input[name=ajax]").length
        ? ""
        : $(this).parents("form").append('<input type="hidden" name="ajax" value="1" />');
      loader = $("<main />");
      loader.addClass("wrapper-ppp");
      loader1 =
        '<section class="loaders loaders-bg-4"><span class="loader loader-bars"><span> </span></span><span class="inform" style="padding-left: 20px;text-align: left">' +
        inform[lang]["1"] +
        '</span></section><style>.wrapper-ppp{width:100vw;height100vh;z-index: 9999999;font-family:sans-serif;font-size:40px;font-size:2.3vw;text-align:center;color:#f9e5ff;position: fixed;left: 0; top:0;}.loaders{display: flex;align-items: center;    justify-content: center;height:100vh;background-color:#06c}.loaders-bg-2{background-color:#fc4532}.loaders-bg-3{background-color:#ff29c8}.loaders-bg-4{background-color:#000}.loader{display:inline-block;position:relative;width:50px;height:28px;vertical-align:middle}.loader-quart{border-radius:50px;border:6px solid rgba(255,255,255,.4)}.loader-quart:after{content:"";position:absolute;top:-6px;right:-6px;bottom:-6px;left:-6px;border-radius:50px;border:6px solid transparent;border-top-color:#f9e5ff;-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.loader-double{border-radius:50px;border:6px solid transparent;border-top-color:#f9e5ff;border-bottom-color:#f9e5ff;-webkit-animation:spin 1.5s linear infinite;animation:spin 1.5s linear infinite}.loader-double:after,.loader-double:before{content:"";position:absolute;top:5px;right:5px;bottom:5px;left:5px;border-radius:50px;border:6px solid transparent;border-top-color:#f9e5ff;border-bottom-color:#f9e5ff;opacity:.6;-webkit-animation:spinreverse 2s linear infinite;animation:spinreverse 2s linear infinite}.loader-double:before{top:13px;left:13px;bottom:13px;right:13px;-webkit-animation:spinreverse 3s linear infinite;animation:spinreverse 3s linear infinite}.loader-circles{border-radius:50px;border:3px solid transparent;border-top-color:#fff;-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.loader-circles:after,.loader-circles:before{content:"";position:absolute;top:5px;right:5px;bottom:5px;left:5px;border-radius:50px;border:3px solid transparent;border-top-color:#f9e5ff;opacity:.8;-webkit-animation:spinreverse 5s linear infinite;animation:spinreverse 5s linear infinite}.loader-circles:before{top:12px;left:12px;bottom:12px;right:12px;-webkit-animation:spinreverse 10s linear infinite;animation:spinreverse 10s linear infinite}.loader-bars span,.loader-bars:after,.loader-bars:before{content:"";display:block;position:absolute;left:0;top:0;width:10px;height:30px;background-color:#f9e5ff;-webkit-animation:grow 1.5s linear infinite;animation:grow 1.5s linear infinite}.loader-bars:after{left:15px;-webkit-animation:grow 1.5s linear -.5s infinite;animation:grow 1.5s linear -.5s infinite}.loader-bars span{left:30px;-webkit-animation:grow 1.5s linear -1s infinite;animation:grow 1.5s linear -1s infinite}@-webkit-keyframes grow{0%{-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0}50%{-webkit-transform:scaleY(1);transform:scaleY(1);opacity:1}100%{-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0}}@keyframes grow{0%{-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0}50%{-webkit-transform:scaleY(1);transform:scaleY(1);opacity:1}100%{-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);tranform:rotate(0)}100%{-webkit-transform:rotate(360deg);tranform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);tranform:rotate(0)}100%{-webkit-transform:rotate(360deg);tranform:rotate(360deg)}}@-webkit-keyframes spinreverse{0%{-webkit-transform:rotate(0);tranform:rotate(0)}100%{-webkit-transform:rotate(-360deg);tranform:rotate(-360deg)}}@keyframes spinreverse{0%{-webkit-transform:rotate(0);tranform:rotate(0)}100%{-webkit-transform:rotate(-360deg);tranform:rotate(-360deg)}} @media screen and (max-width: 900px){.wrapper-ppp {    font-size: 5vw;}.inform {width: 28%;} }</style>';

      $("body").prepend(loader);

      $(".inform").html(inform[lang][2]);
      setTimeout(function () {
        $(".inform").html(inform[lang][3]);
      }, 2000);
      setTimeout(function () {
        $(".inform").html(inform[lang][4]);
        t.parents("form").trigger("submit");
      }, 3000);
      loader.html(loader1);
    } else {
      t.parents("form").trigger("submit");
    }
  }
  $("form input[type=submit]").click(function (e) {
    e.preventDefault();
    if (checkForm($(this))) {
      submitForm($(this));
    }
  });
  $("form input[type=button]").click(function (e) {
    e.preventDefault();
    if (checkForm($(this))) {
      submitForm($(this));
    }
  });
  var addOnce = true;

  function checkAllForms(check) {
    check ? "" : (check = "nope");
    $("form").each(function () {
      addOnce ? $(this).attr("autocomplete", "on") : "";
      checkForm($(this).find("input"), check);
    });
  }
  checkAllForms();
  $("form input").on("input", function () {
    let name = $(this).attr("name");
    if (name == "phone") {
      var it = $(this).attr("data-iti");
      $(".phone2").val(iti[it].getNumber());
    }
    $("input[name=" + name + "]").val($(this).val());
    checkAllForms(name);
  });
  var errorsUnswers = {
     ar: {
      f_name: " الحقل مطلوب ـ ",
      l_name: " الحقل مطلوب ـ ",
      email: " الحقل مطلوب ـ ",
      phone: " الحقل مطلوب ـ ",
    },
    af: {
    f_name: "Voer jou voornaam in",
    l_name: "Voer jou van in",
    email: "Voer jou e-posadres in",
    phone: "Voer jou telefoonnommer in",
    },
     cz: {
      f_name: "Zadejte jméno",
      l_name: "Zadejte příjmení",
      email: "Zadejte e-mail",
      phone: "Zadejte telefon",
    },
    da: {
      f_name: "Indtast dit fornavn",
      l_name: "Indtast dit efternavn",
      email: "Indtast din e-mailadresse",
      phone: "Indtast dit telefonnummer",
      },
    de: {
      f_name: "Geben Sie Ihren Vornamen ein",
      l_name: "Geben Sie Ihren Nachnamen ein",
      email: "Geben Sie Ihre E-Mail ein",
      phone: "Geben Sie Ihre Telefonnummer ein",
    },
    dk: {
      f_name: "Indtast et fornavn",
      l_name: "Indtast et efternavn",
      email: "Indtast din e-mailadresse",
      phone: "Indtast dit telefonnummer",
    },
    en: {
      f_name: "Insert name",
      l_name: "Insert last name",
      email: "Insert email",
      phone: "Insert phone number",
    },
    es: {
      f_name: "Ingrese su nombre",
      l_name: "Ingrese su apellido",
      email: "Ingrese su e-mail",
      phone: "Ingrese su número de teléfono",
    },
    hu: {
      f_name: "Adja meg a keresztnevét",
      l_name: "Adja meg a vezetéknevét",
      email: "Adja meg az e-mail címét",
      phone: "Adja meg a telefonszámát",
     },
    hr: {
      f_name: "Unesite svoje ime",
      l_name: "Unesite svoje prezime",
      email: "Unesite svoju e-mail adresu",
      phone: "Unesite svoj broj telefona",
      },
    kr: {
      f_name: "이름을 입력하세요",
      l_name: "성을 입력하세요",
      email: "이메일 주소를 입력하세요",
      phone: "전화번호를 입력하세요",
      },
    jp: {
      f_name: "名前を入力",
      l_name: "苗字を入力",
      email: "Eメールアドレスを入力します。",
      phone: "電話番号を入力",
    },
    lo: {
      f_name: "ໃສ່ຊື່ຂອງທ່ານ",
      l_name: "ໃສ່ນາມສະກຸນຂອງທ່ານ",
      email: "ໃສ່ທີ່ຢູ່ອີເມລຂອງທ່ານ",
      phone: "ໃສ່ເບີໂທຂອງທ່ານ",
    },
    lv: {
      f_name: "Ievadiet vārdu",
      l_name: "Ievadiet uzvārdu",
      email: "Ievadiet savu e-pasta adresi",
      phone: "Ievadiet savu tālruņa numuru",
    },
    in: {
      f_name: "अपना नाम दर्ज करें",
      l_name: "अंतिम नाम दर्ज करो",
      email: "ईमेल दर्ज करें",
      phone: "फ़ोन दर्ज करें",
    },
    it: {
      f_name: "Inserire nome",
      l_name: "Inserire cognome",
      email: "Inserire email",
      phone: "Inserire numero di telefono",
    },
    no: {
      f_name: "Skriv inn fornavnet ditt",
      l_name: "Skriv inn etternavnet ditt",
      email: "Skriv inn e-postadressen din",
      phone: "Skriv inn telefonnummeret ditt",
    },
    nl: {
      f_name: "Voer een voornaam in",
      l_name: "Voer een achternaam in",
      email: "Voer uw e-mailadres in",
      phone: "Voer uw telefoonnummer in",
    },
    pl: {
      f_name: "Podaj imię",
      l_name: "Podaj nazwisko",
      email: "Podaj email",
      phone: "Podaj numer telefonu",
    },
    pt: {
      f_name: "Digite o nome",
      l_name: "Digite o sobrenome",
      email: "Digite o e-mail",
      phone: "Digite o telefone",
    },
    ro: {
      f_name: "Introduceți un nume",
      l_name: "Introduceți numele de familie",
      email: "Introduceți adresa dvs. de e-mail",
      phone: "Introduceți numărul de telefon",
    },
    ru: {
      f_name: "Введите Имя",
      l_name: "Введите фамилию",
      email: "Введите email",
      phone: "Введите телефон",
    },
    rs: {
      f_name: "Унесите своје име",
      l_name: "Унесите своје презиме",
      email: "Унесите своју адресу е-поште",
      phone: "Унесите свој број телефона",
    },
    si: {
      f_name: "Vnesite svoje ime",      
      l_name: "Vnesite svoj priimek",      
      email: "Vnesite svoj e-poštni naslov",      
      phone: "Vnesite svojo telefonsko številko",
    },
    se: {
      f_name: "Ange ett förnamn",
      l_name: "Ange ett efternamn",
      email: "Ange din e-postadress",
      phone: "Ange ditt telefonnummer",
    },
    sk: {
      f_name: "Zadajte svoje meno",      
      l_name: "Zadajte svoje priezvisko",      
      email: "Zadajte svoju e-mailovú adresu",      
      phone: "Zadajte svoje telefónne číslo",
    },
    tr: {
      f_name: "İsim girin",
      l_name: "Soyadı girin",
      email: "E-posta adresinizi girin",
      phone: "Telefon numaranızı girin",
    },
    fi: {
      f_name: "Syötä etunimi",
      l_name: "Syötä sukunimi",
      email: "Syötä sähköpostiosoitteesi",
      phone: "Syötä puhelinnumerosi",
    },
    fr: {
      f_name: "Adja meg a keresztnevét",
      l_name: "Adja meg a vezetéknevét",
      email: "Adja meg az e-mail címét",
      phone: "Adja meg a telefonszámát",
    },
    gr: {
      f_name: "Εισάγετε το όνομά σας",      
      l_name: "Εισάγετε το επώνυμό σας",      
      email: "Εισάγετε τη διεύθυνση email σας",      
      phone: "Εισάγετε τον αριθμό τηλεφώνου σας",
    },
    vi: {
      f_name: "Nhập tên của bạn",
      l_name: "Nhập họ của bạn",
      email: "Nhập địa chỉ email của bạn",
      phone: "Nhập số điện thoại của bạn",
    },
    zh: {
      f_name: "插入名称",
      l_name: "插入姓氏",
      email: "插入电子邮件",
      phone: "插入电话号码",
    },
  };

  function checkForm(_this, check) {
    var flag = true;
    var reg = /[0-9]/;
    _this
      .parents("form")
      .find("input")
      .each(function () {
        addOnce ? $(this).attr("autocomplete", "on") : "";
        var name = $(this).attr("name");
        if (name == "f_name") {
          $(this).parent().find(".help-block-error").length
            ? ""
            : $(this).parent().append('<div class="help-block help-block-error"></div>');
          if ($(this).val().length < 1 || reg.test($(this).val())) {
            flag = false;
            if (check == undefined || check == "f_name") {
              $(this).parent().find(".help-block-error").html(errorsUnswers[lang][name]).addClass("block");
              $(this).removeClass("valid").addClass("err");
            }
          } else {
            $(this).parent().find(".help-block-error").html("").removeClass("block");
            $(this).removeClass("err").addClass("valid");
          }
        }
        if (name == "l_name") {
          $(this).parent().find(".help-block-error").length
            ? ""
            : $(this).parent().append('<div class="help-block help-block-error"></div>');
          if ($(this).val().length < 1 || reg.test($(this).val())) {
            flag = false;
            if (check == undefined || check == "l_name") {
              $(this).parent().find(".help-block-error").html(errorsUnswers[lang][name]).addClass("block");
              $(this).removeClass("valid").addClass("err");
            }
          } else {
            $(this).parent().find(".help-block-error").html("").removeClass("block");
            $(this).removeClass("err").addClass("valid");
          }
        }
        if (name == "email") {
          $(this).parent().find(".help-block-error").length
            ? ""
            : $(this).parent().append('<div class="help-block help-block-error"></div>');
          var re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test($(this).val().toLowerCase())) {
            flag = false;
            if (check == undefined || check == "email") {
              $(this).parent().find(".help-block-error").html(errorsUnswers[lang][name]).addClass("block");
              $(this).removeClass("valid").addClass("err");
            }
          } else {
            $(this).parent().find(".help-block-error").html("").removeClass("block");
            $(this).removeClass("err").addClass("valid");
          }
        }
        if (name == "phone") {
          $(this).parents(".form-group").find(".help-block-error").length
            ? ""
            : $(this).parents(".form-group").append('<div class="help-block help-block-error"></div>');
          _this = $(this);
          if (!_this.hasClass("valid")) {
            flag = false;
          }
          setTimeout(function () {
            if (!_this.hasClass("valid")) {
              flag = false;
              if (check == undefined || check == "phone") {
                _this.addClass("err");
                _this
                  .parents(".form-group")
                  .find(".help-block-error")
                  .html(errorsUnswers[lang][name])
                  .addClass("block");
              }
            } else {
              _this.parents(".form-group").find(".help-block-error").html("").removeClass("block");
            }
          }, 500);
        }
      });
    addOnce = false;
    return flag;
  }
  if ($(".alterlink")) {
    $("body").append(
      '<div class="pop-outer">\n' +
        '    <div class="pop-bg"></div>\n' +
        '    <div class="pop-inner">\n' +
        '        <div class="pop-close">X</div>\n' +
        '        <div class="pop-inner__in">\n' +
        "\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>"
    );
  }
  $(".alterlink").click(function (e) {
    e.preventDefault();
    var pol = $(this).attr("href");
    var nam = $(this).html();
    posY = $(window).scrollTop();
    $("body").css({
      overflow: "hidden",
    });
    $.ajax({
      type: "post",
      url: pol,
      success: function (res) {
        $(".pop-outer").addClass("active");
        $(".pop-inner__in ").html(res);
      },
    });
  });
  $(".pop-close").click(closePop);
  $(".pop-bg").click(closePop);

  function closePop() {
    $("body").css({
      overflow: "auto",
    });
    $("html, body").animate(
      {
        scrollTop: posY + "px",
      },
      0
    );
    $(".pop-inner__in ").animate(
      {
        scrollTop: 0 + "px",
      },
      0
    );
    $(".pop-outer").removeClass("active");
    $(".pop-inner__in ").html(" ");
  }
  var posY = 0;
  $(".cookie").click(function () {
    posY = $(window).scrollTop();
    $("body").css({
      overflow: "hidden",
    });
    $(".cookie-policy-pop").addClass("modal-open");
  });
  $(".terms__close").click(function () {
    $("body").css({
      overflow: "auto",
    });
    $("html, body").animate(
      {
        scrollTop: posY + "px",
      },
      0
    );
    $(".terms").removeClass("modal-open").css("display", "none");
    $(".modal-bg").addClass("modal-open").css("display", "none");
  });
  $(".scroll-top-btn").click(function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $(".hero").offset().top + "px",
      },
      500
    );
  });
  $(".pops").click(function () {
    posY = $(window).scrollTop();
    $("body").css({
      overflow: "hidden",
    });
    var r = $(this).attr("data-pop");
    $(".terms[data-pop=" + r + "]")
      .addClass("modal-open")
      .css("display", "block");
    $(".modal-bg").addClass("modal-open").css("display", "block");
  });
  window.onscroll = function () {
    $(window).scrollTop() > 200 ? $(".navBarSlider").addClass("slided") : $(".navBarSlider").removeClass("slided");
  };
  if ($.exitIntent) {
    $.exitIntent("enable");
    var fr = false;
    var timeout = 120000;
    if ($("html").hasClass("test")) {
      timeout = 1000;
    }
    console.log(timeout);
    $(".exit_popup .close").click(function () {
      posY = $(window).scrollTop();
      $(".exit_popup").modal("hide").hide().css("display", "none");
      $(".modal-bg").addClass("modal-open").css("display", "none");
    });

    function timeoutWait() {
      setTimeout(function () {
        fr = true;
      }, timeout);
    }
    timeoutWait();
    $(document).bind("exitintent", function () {
      if (!fr) {
        return;
      }
      fr = false;
      timeoutWait();
      posY = $(window).scrollTop();
      $(".exit_popup").modal("show").show().css("display", "block");
      $(".modal-bg").addClass("modal-open").css("display", "block");
    });
  }
  $(".video-insert").each(function () {
    let vid = $(this).attr("data-video");
    let video = $("<video/>");
    let poster = $(this).attr("data-poster");
    video.attr("src", vid);
    video.attr("playsinline", true);
    video.attr("controls", true);
    video.attr("preload", "none");
    video.attr("allowfullscreen", "true");
    poster ? video.attr("poster", poster) : "";
    video.css({
      width: "100%",
      height: "100%",
    });
    $(this).append(video);
    let playBtn = $("<div/>");
    playBtn.addClass("play-btn");
    $(this).append(playBtn);
  });
  let playBtns = document.querySelectorAll(".play-btn");
  for (var i = 0; i < playBtns.length; i++) {
    playBtns[i].addEventListener("click", function () {
      let videoEl = this.parentNode.querySelector("video");
      if (videoEl.paused) {
        videoEl.play();
        this.parentNode.classList.add("play");
      } else {
        videoEl.pause();
        this.parentNode.classList.remove("play");
      }
    });
  }
});
if ($("#youtube-insert").length) {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-insert", {
      height: "360",
      width: "640",
      videoId: $("#youtube-insert").attr("data-video"),
      events: {
        onReady: onPlayerReady,
      },
      playerVars: {
        controls: 0,
        loop: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    });
  }

  function onPlayerReady(event) {
    $(".over").click(function () {
      console.log(player, player.getPlayerState());
      if (player.getPlayerState() != 1) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    });
  }
}
