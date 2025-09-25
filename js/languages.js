let ipInfo = getLocationInfo();

// Function to get user location info
function getLocationInfo() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ipinfo.io/json', false);
    xhr.send();

    if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const {ip, country} = response;
        return {ip, geo: country};
    } else {
        console.error('Error fetching user info:', xhr.status);
    }
}

const dataLang = {
    languages: {
    de: {
        language: "de",
        registrationTitle: "Bestätigen Sie Ihre Registrierung!",
        registrationText: "Um die Registrierung abzuschließen, müssen Sie Ihre zuvor im Formular angegebenen Daten erneut eingeben. Damit bestätigen Sie Ihre Absicht, und unser Manager wird Sie schneller anrufen!",
        name: "Vorname",
        surname: "Nachname",
        email: "E-Mail",
        submitBtn: "Bestätigen",
        policy: "Datenschutz",
        terms: "Bedingungen",
        disclaimer: "Haftungsausschluss",
        andText: "und",
    },
    en: {
        language: "en",
        registrationTitle: "Confirm your registration!",
        registrationText: "To complete the registration, you need to re-enter the data you previously provided in the form. This confirms your intention, and our manager will call you faster!",
        name: "First Name",
        surname: "Last Name",
        email: "Email",
        submitBtn: "Confirm",
        policy: "Privacy Policy",
        terms: "Terms",
        disclaimer: "Disclaimer",
        andText: "and",
    },
    ru: {
        language: "ru",
        registrationTitle: "Подтвердите вашу регистрацию!",
        registrationText: "Чтобы завершить регистрацию, необходимо ещё раз ввести данные, оставленные ранее в форме. Тем самым вы подтверждаете свои намерения, и наш менеджер свяжется с вами быстрее!",
        name: "Имя",
        surname: "Фамилия",
        email: "Электронная почта",
        submitBtn: "Подтвердить",
        policy: "Политика конфиденциальности",
        terms: "Условия",
        disclaimer: "Отказ от ответственности",
        andText: "и",
    },
    uk: {
        language: "uk",
        registrationTitle: "Підтвердіть свою реєстрацію!",
        registrationText: "Для завершення реєстрації потрібно ще раз ввести свої дані, залишені у формі раніше. Цим ви підтверджуєте свої наміри, і наш менеджер зателефонує вам швидше!",
        name: "Ім'я",
        surname: "Прізвище",
        email: "Електронна пошта",
        submitBtn: "Підтвердити",
        policy: "Політика конфіденційності",
        terms: "Умови",
        disclaimer: "Відмова від відповідальності",
        andText: "та",
    },
    fr: {
        language: "fr",
        registrationTitle: "Confirmez votre inscription !",
        registrationText: "Pour finaliser l'inscription, vous devez saisir à nouveau les données que vous avez précédemment fournies dans le formulaire. Cela confirme votre intention et notre manager vous appellera plus rapidement !",
        name: "Prénom",
        surname: "Nom",
        email: "Email",
        submitBtn: "Confirmer",
        policy: "Politique de confidentialité",
        terms: "Conditions",
        disclaimer: "Avertissement",
        andText: "et",
    },
    pl: {
        language: "pl",
        registrationTitle: "Potwierdź swoją rejestrację!",
        registrationText: "Aby zakończyć rejestrację, musisz ponownie wprowadzić dane podane wcześniej w formularzu. Potwierdzasz tym samym swoje zamiary, a nasz menedżer zadzwoni do Ciebie szybciej!",
        name: "Imię",
        surname: "Nazwisko",
        email: "Email",
        submitBtn: "Potwierdź",
        policy: "Polityka prywatności",
        terms: "Warunki",
        disclaimer: "Zastrzeżenie",
        andText: "i",
    },
    cs: {
        language: "cs",
        registrationTitle: "Potvrďte svou registraci!",
        registrationText: "Pro dokončení registrace musíte znovu zadat údaje, které jste dříve uvedli ve formuláři. Tím potvrdíte svůj úmysl a náš manažer vám zavolá rychleji!",
        name: "Jméno",
        surname: "Příjmení",
        email: "Email",
        submitBtn: "Potvrdit",
        policy: "Zásady ochrany osobních údajů",
        terms: "Podmínky",
        disclaimer: "Vyloučení odpovědnosti",
        andText: "a",
    },
    it: {
        language: "it",
        registrationTitle: "Conferma la tua registrazione!",
        registrationText: "Per completare la registrazione devi reinserire i dati che hai precedentemente fornito nel modulo. In questo modo confermi la tua intenzione e il nostro manager ti chiamerà più rapidamente!",
        name: "Nome",
        surname: "Cognome",
        email: "Email",
        submitBtn: "Conferma",
        policy: "Informativa sulla privacy",
        terms: "Termini",
        disclaimer: "Disclaimer",
        andText: "e",
    },
    ja: {
        language: "ja",
        registrationTitle: "登録を確認してください！",
        registrationText: "登録を完了するには、以前フォームに入力した情報をもう一度入力する必要があります。これにより意思が確認され、マネージャーがより早くご連絡いたします！",
        name: "名",
        surname: "姓",
        email: "メール",
        submitBtn: "確認する",
        policy: "プライバシーポリシー",
        terms: "利用規約",
        disclaimer: "免責事項",
        andText: "と",
    },
    ro: {
        language: "ro",
        registrationTitle: "Confirmă-ți înregistrarea!",
        registrationText: "Pentru a finaliza înregistrarea, trebuie să introduci din nou datele completate anterior în formular. Astfel îți confirmi intențiile și managerul nostru te va contacta mai repede!",
        name: "Prenume",
        surname: "Nume",
        email: "Email",
        submitBtn: "Confirmă",
        policy: "Politica de confidențialitate",
        terms: "Termeni",
        disclaimer: "Declinarea responsabilității",
        andText: "și",
    },
    es: {
        language: "es",
        registrationTitle: "¡Confirma tu registro!",
        registrationText: "Para completar el registro, debes volver a introducir los datos que proporcionaste previamente en el formulario. Esto confirma tu intención y nuestro gerente te llamará más rápido!",
        name: "Nombre",
        surname: "Apellido",
        email: "Correo electrónico",
        submitBtn: "Confirmar",
        policy: "Política de privacidad",
        terms: "Términos",
        disclaimer: "Descargo de responsabilidad",
        andText: "y",
    },
    pt: {
        language: "pt",
        registrationTitle: "Confirme o seu registro!",
        registrationText: "Para concluir o registro, você precisa inserir novamente os dados que forneceu anteriormente no formulário. Isso confirma sua intenção e nosso gerente ligará para você mais rápido!",
        name: "Nome",
        surname: "Sobrenome",
        email: "Email",
        submitBtn: "Confirmar",
        policy: "Política de Privacidade",
        terms: "Termos",
        disclaimer: "Aviso legal",
        andText: "e",
    },
    tr: {
        language: "tr",
        registrationTitle: "Kaydınızı doğrulayın!",
        registrationText: "Kaydı tamamlamak için formda daha önce verdiğiniz bilgileri yeniden girmeniz gerekiyor. Bu, niyetinizi doğrular ve yöneticimiz size daha hızlı ulaşır!",
        name: "Ad",
        surname: "Soyad",
        email: "E-posta",
        submitBtn: "Onayla",
        policy: "Gizlilik Politikası",
        terms: "Şartlar",
        disclaimer: "Feragatname",
        andText: "ve",
    },
}

};

//let loc = ipInfo.geo.toLowerCase()
// Base language from browser
let loc = navigator.language.split('-')[0];
// Override via ?lang= parameter if present
try {
    const urlParams = new URLSearchParams(window.location.search);
    const forced = (urlParams.get('lang') || '').trim().toLowerCase();
    if(forced && /^[a-z]{2}$/.test(forced)) {
        loc = forced;
    }
} catch(e) {
    // Silent: URLSearchParams may fail in edge envs; keep browser language
}


const registrationTitle = document.getElementById("registrationTitle");
const registrationText = document.getElementById("registrationText");
const mainTitle = document.getElementById("mainTitle");
const form_name = document.getElementById("form__name");
const form_last = document.getElementById("form__last");
const form_email = document.getElementById("form__email");
const lead_submit = document.getElementById("lead__submit");
const cookieContent = document.getElementById("cookieContent");
const policyContent = document.getElementById("policyContent");
const termsContent = document.getElementById("termsContent");
const disclaimerContent = document.getElementById("disclaimerContent");
const andText = document.getElementById("andText");
// Fallback chain: browser language -> English -> first available key
if(!dataLang.languages[loc]) {
    loc = 'en' in dataLang.languages ? 'en' : Object.keys(dataLang.languages)[0];
}

const current = dataLang.languages[loc];
if(current) {
    if(registrationTitle) registrationTitle.textContent = current.registrationTitle;
    if(registrationText) registrationText.textContent = current.registrationText;
    if(form_name) form_name.placeholder = current.name;
    if(form_last) form_last.placeholder = current.surname;
    if(form_email) form_email.placeholder = current.email;
    if(lead_submit) lead_submit.textContent = current.submitBtn;
    if(policyContent) policyContent.textContent = current.policy;
    if(termsContent) termsContent.textContent = current.terms;
    if(disclaimerContent) disclaimerContent.textContent = current.disclaimer;
    if(andText) andText.textContent = current.andText;
}

