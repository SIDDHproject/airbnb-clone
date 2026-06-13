import React, { createContext, useContext, useState, useEffect } from "react";
import { mockListings } from "../data/mockData";

const AppContext = createContext();

const initialFilters = {
  category: "All",
  location: "",
  guests: { adults: 0, children: 0, infants: 0, pets: 0 },
  dates: { startDate: null, endDate: null },
  priceRange: [0, 1500],
  typeOfPlace: "Any",
  amenities: []
};

export const AppProvider = ({ children }) => {
  // Load listings, with local storage fallback if the user added items previously
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem("airbnb_listings_v2");
    return saved ? JSON.parse(saved) : mockListings;
  });

  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("airbnb_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Load dark mode from localStorage or system preferences
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("airbnb_dark_mode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [filters, setFilters] = useState(initialFilters);
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeHeaderTab, setActiveHeaderTab] = useState("Homes");

  // Modals open states
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Language & Currency states
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const saved = localStorage.getItem("airbnb_language");
    return saved ? JSON.parse(saved) : { name: "English (GB)", code: "EN", region: "United Kingdom" };
  });

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const saved = localStorage.getItem("airbnb_currency");
    return saved ? JSON.parse(saved) : { name: "United States Dollar", code: "USD", symbol: "$" };
  });

  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("airbnb_language", JSON.stringify(selectedLanguage));
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem("airbnb_currency", JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  const currencyRates = {
    USD: 1.0,
    GBP: 0.8,
    EUR: 0.92,
    AUD: 1.5,
    CAD: 1.36,
    JPY: 155.0,
    INR: 83.0,
    BRL: 5.1,
    CNY: 7.2,
    KRW: 1370.0
  };

  const translations = {
    EN: {
      becomeHost: "Become a host",
      helpCentre: "Help Centre",
      loginSignup: "Log in or sign up",
      wishlist: "Wishlist",
      filters: "Filters",
      where: "Where",
      when: "When",
      who: "Who",
      searchDest: "Search destinations",
      anywhere: "Anywhere",
      anyWeek: "Any week",
      addGuests: "Add guests",
      homes: "Homes",
      experiences: "Experiences",
      services: "Services",
      search: "Search",
      night: "night",
      referHost: "Refer a host",
      findCoHost: "Find a co-host",
      aboutSpace: "About this space",
      whatOffers: "What this place offers",
      reviews: "reviews",
      review: "review",
      noReviews: "No reviews yet for this listing.",
      lengthStay: "Length of Stay (Nights)",
      adults: "Adults",
      children: "Children",
      infants: "Infants",
      pets: "Pets",
      cleaningFee: "Cleaning fee",
      serviceFee: "Airbnb service fee",
      totalBeforeTaxes: "Total before taxes",
      reserveHouse: "Reserve House",
      noChargedYet: "You won't be charged yet",
      age13: "Age 13 or above",
      ages2: "Ages 2 – 12",
      under2: "Under 2 years",
      serviceAnimal: "Bringing a service animal?",
      clearSearch: "Clear search",
      done: "Done",
      reset: "Reset",
      checkIn: "Check In",
      checkOut: "Check Out",
      selectDates: "Select stay dates",
      popularDest: "Popular destinations",
      stayScheduled: "Your stay is scheduled!",
      success: "Reservation Success",
      confirmed: "Booking Confirmed!"
    },
    DE: {
      becomeHost: "Hosten",
      helpCentre: "Hilfe-Center",
      loginSignup: "Einloggen oder registrieren",
      wishlist: "Wunschliste",
      filters: "Filter",
      where: "Wohin",
      when: "Wann",
      who: "Wer",
      searchDest: "Reiseziele suchen",
      anywhere: "Überall",
      anyWeek: "Beliebige Woche",
      addGuests: "Gäste hinzufügen",
      homes: "Unterkünfte",
      experiences: "Entdeckungen",
      services: "Dienste",
      search: "Suchen",
      night: "Nacht",
      referHost: "Einen Host empfehlen",
      findCoHost: "Einen Co-Host finden",
      aboutSpace: "Über diese Unterkunft",
      whatOffers: "Was diese Unterkunft bietet",
      reviews: "Bewertungen",
      review: "Bewertung",
      noReviews: "Noch keine Bewertungen vorhanden.",
      lengthStay: "Aufenthaltsdauer (Nächte)",
      adults: "Erwachsene",
      children: "Kinder",
      infants: "Kleinkinder",
      pets: "Haustiere",
      cleaningFee: "Reinigungsgebühr",
      serviceFee: "Airbnb-Servicegebühr",
      totalBeforeTaxes: "Gesamtsumme vor Steuern",
      reserveHouse: "Unterkunft reservieren",
      noChargedYet: "Noch keine Belastung",
      age13: "Ab 13 Jahren",
      ages2: "Im Alter von 2–12 Jahren",
      under2: "Unter 2 Jahren",
      serviceAnimal: "Mit Assistenztier?",
      clearSearch: "Suche löschen",
      done: "Fertig",
      reset: "Zurücksetzen",
      checkIn: "Check-in",
      checkOut: "Check-out",
      selectDates: "Reisedaten auswählen",
      popularDest: "Beliebte Reiseziele",
      stayScheduled: "Ihr Aufenthalt ist gebucht!",
      success: "Buchung erfolgreich",
      confirmed: "Buchung bestätigt!"
    },
    FR: {
      becomeHost: "Devenir hôte",
      helpCentre: "Centre d'aide",
      loginSignup: "Connexion ou inscription",
      wishlist: "Favoris",
      filters: "Filtres",
      where: "Où",
      when: "Quand",
      who: "Qui",
      searchDest: "Rechercher des destinations",
      anywhere: "N'importe où",
      anyWeek: "N'importe quelle semaine",
      addGuests: "Ajouter des voyageurs",
      homes: "Logements",
      experiences: "Expériences",
      services: "Services",
      search: "Rechercher",
      night: "nuit",
      referHost: "Parrainer un hôte",
      findCoHost: "Trouver un co-hôte",
      aboutSpace: "À propos de ce logement",
      whatOffers: "Ce que propose ce logement",
      reviews: "commentaires",
      review: "commentaire",
      noReviews: "Pas encore de commentaires.",
      lengthStay: "Durée du séjour (Nuits)",
      adults: "Adultes",
      children: "Enfants",
      infants: "Bébés",
      pets: "Animaux de compagnie",
      cleaningFee: "Frais de ménage",
      serviceFee: "Frais de service Airbnb",
      totalBeforeTaxes: "Total hors taxes",
      reserveHouse: "Réserver le logement",
      noChargedYet: "Aucun paiement requis pour l'instant",
      age13: "13 ans et plus",
      ages2: "2 à 12 ans",
      under2: "Moins de 2 ans",
      serviceAnimal: "Animal d'assistance?",
      clearSearch: "Effacer la recherche",
      done: "Terminé",
      reset: "Réinitialiser",
      checkIn: "Arrivée",
      checkOut: "Départ",
      selectDates: "Sélectionner les dates",
      popularDest: "Destinations populaires",
      stayScheduled: "Votre séjour est planifié!",
      success: "Réservation réussie",
      confirmed: "Réservation confirmée!"
    },
    ES: {
      becomeHost: "Hazte anfitrión",
      helpCentre: "Centro de ayuda",
      loginSignup: "Iniciar sesión o registrarse",
      wishlist: "Favoritos",
      filters: "Filtros",
      where: "Dónde",
      when: "Cuándo",
      who: "Quién",
      searchDest: "Buscar destinos",
      anywhere: "Cualquier lugar",
      anyWeek: "Cualquier semana",
      addGuests: "Añadir huéspedes",
      homes: "Alojamientos",
      experiences: "Experiencias",
      services: "Servicios",
      search: "Buscar",
      night: "noche",
      referHost: "Recomendar a un anfitrión",
      findCoHost: "Buscar un coanfitrión",
      aboutSpace: "Acerca de este espacio",
      whatOffers: "Lo que este lugar ofrece",
      reviews: "evaluaciones",
      review: "evaluación",
      noReviews: "Aún no hay evaluaciones.",
      lengthStay: "Duración de la estancia (Noches)",
      adults: "Adultos",
      children: "Niños",
      infants: "Bebés",
      pets: "Mascotas",
      cleaningFee: "Gastos de limpieza",
      serviceFee: "Comisión de servicio de Airbnb",
      totalBeforeTaxes: "Total antes de impuestos",
      reserveHouse: "Reservar alojamiento",
      noChargedYet: "No se te cobrará nada aún",
      age13: "13 años o más",
      ages2: "De 2 a 12 años",
      under2: "Menores de 2 años",
      serviceAnimal: "¿Traes un animal de asistencia?",
      clearSearch: "Borrar búsqueda",
      done: "Hecho",
      reset: "Restablecer",
      checkIn: "Llegada",
      checkOut: "Salida",
      selectDates: "Seleccionar fechas",
      popularDest: "Destinos populares",
      stayScheduled: "¡Tu estancia está programada!",
      success: "Reserva exitosa",
      confirmed: "¡Reserva confirmada!"
    },
    IT: {
      becomeHost: "Diventa un host",
      helpCentre: "Centro Assistenza",
      loginSignup: "Accedi o registrati",
      wishlist: "Preferiti",
      filters: "Filtri",
      where: "Dove",
      when: "Quando",
      who: "Chi",
      searchDest: "Cerca destinazioni",
      anywhere: "Ovunque",
      anyWeek: "Qualsiasi settimana",
      addGuests: "Aggiungi ospiti",
      homes: "Alloggi",
      experiences: "Esperienze",
      services: "Servizi",
      search: "Cerca",
      night: "notte",
      referHost: "Presenta un host",
      findCoHost: "Trova un co-host",
      aboutSpace: "Informazioni sullo spazio",
      whatOffers: "Cosa offre questa casa",
      reviews: "recensioni",
      review: "recensione",
      noReviews: "Nessuna recensione presente.",
      lengthStay: "Durata del soggiorno (Notti)",
      adults: "Adulti",
      children: "Bambini",
      infants: "Neonati",
      pets: "Animali domestici",
      cleaningFee: "Spese di pulizia",
      serviceFee: "Costi di servizio Airbnb",
      totalBeforeTaxes: "Totale prima delle tasse",
      reserveHouse: "Prenota alloggio",
      noChargedYet: "Non pagherai ancora nulla",
      age13: "Da 13 anni in su",
      ages2: "Età 2 – 12",
      under2: "Meno di 2 anni",
      serviceAnimal: "Porti un animale di servizio?",
      clearSearch: "Cancella ricerca",
      done: "Fine",
      reset: "Reimposta",
      checkIn: "Check-in",
      checkOut: "Check-out",
      selectDates: "Seleziona date",
      popularDest: "Destinazioni popolari",
      stayScheduled: "Il soggiorno è pianificato!",
      success: "Prenotazione riuscita",
      confirmed: "Prenotazione confermata!"
    },
    PT: {
      becomeHost: "Seja um anfitrião",
      helpCentre: "Central de Ajuda",
      loginSignup: "Entrar ou cadastrar-se",
      wishlist: "Favoritos",
      filters: "Filtros",
      where: "Onde",
      when: "Quando",
      who: "Quem",
      searchDest: "Buscar destinos",
      anywhere: "Qualquer lugar",
      anyWeek: "Qualquer semana",
      addGuests: "Adicionar hóspedes",
      homes: "Acomodações",
      experiences: "Experiências",
      services: "Serviços",
      search: "Buscar",
      night: "noite",
      referHost: "Indique um anfitrião",
      findCoHost: "Encontre um coanfitrião",
      aboutSpace: "Sobre este espaço",
      whatOffers: "O que este lugar oferece",
      reviews: "avaliações",
      review: "avaliação",
      noReviews: "Nenhuma avaliação disponível.",
      lengthStay: "Duração da estadia (Noites)",
      adults: "Adultos",
      children: "Crianças",
      infants: "Bebês",
      pets: "Animais",
      cleaningFee: "Taxa de limpeza",
      serviceFee: "Taxa de serviço do Airbnb",
      totalBeforeTaxes: "Total antes dos impostos",
      reserveHouse: "Reservar acomodação",
      noChargedYet: "Você não será cobrado ainda",
      age13: "13 anos ou mais",
      ages2: "Idade 2 – 12",
      under2: "Menores de 2 anos",
      serviceAnimal: "Trazendo animal de serviço?",
      clearSearch: "Limpar busca",
      done: "Pronto",
      reset: "Redefinir",
      checkIn: "Check-in",
      checkOut: "Check-out",
      selectDates: "Selecionar datas",
      popularDest: "Destinos populares",
      stayScheduled: "Sua estadia está agendada!",
      success: "Reserva concluída",
      confirmed: "Reserva confirmada!"
    },
    NL: {
      becomeHost: "Word host",
      helpCentre: "Hulpcertificaat",
      loginSignup: "Inloggen of aanmelden",
      wishlist: "Verlanglijst",
      filters: "Filters",
      where: "Waar",
      when: "Wanneer",
      who: "Wie",
      searchDest: "Bestemmingen zoeken",
      anywhere: "Overal",
      anyWeek: "Elke week",
      addGuests: "Gasten toevoegen",
      homes: "Woningen",
      experiences: "Ervaringen",
      services: "Diensten",
      search: "Zoeken",
      night: "nacht",
      referHost: "Verwijs een host",
      findCoHost: "Vind een co-host",
      aboutSpace: "Over deze ruimte",
      whatOffers: "Wat deze plek biedt",
      reviews: "recensies",
      review: "recensie",
      noReviews: "Nog geen recensies.",
      lengthStay: "Lengte van verblijf (Nachten)",
      adults: "Volwassenen",
      children: "Kinderen",
      infants: "Baby's",
      pets: "Huisdieren",
      cleaningFee: "Schoonmaakkosten",
      serviceFee: "Airbnb servicekosten",
      totalBeforeTaxes: "Totaal voor belastingen",
      reserveHouse: "Reserveer huis",
      noChargedYet: "Je hoeft nu nog niet te betalen",
      age13: "13 jaar of ouder",
      ages2: "Leeftijd 2 - 12",
      under2: "Jonger dan 2 jaar",
      serviceAnimal: "Hulphond mee?",
      clearSearch: "Zoekopdracht wissen",
      done: "Gereed",
      reset: "Resetten",
      checkIn: "Inchecken",
      checkOut: "Uitchecken",
      selectDates: "Selecteer datums",
      popularDest: "Populaire bestemmingen",
      stayScheduled: "Je verblijf is gepland!",
      success: "Reservering geslaagd",
      confirmed: "Boeking bevestigd!"
    },
    JA: {
      becomeHost: "ホストになる",
      helpCentre: "ヘルプセンター",
      loginSignup: "ログインまたは登録",
      wishlist: "お気に入り",
      filters: "フィルター",
      where: "どこ",
      when: "いつ",
      who: "だれ",
      searchDest: "目的地を検索",
      anywhere: "どこでも",
      anyWeek: "いつでも",
      addGuests: "旅行者を追加",
      homes: "宿泊先",
      experiences: "体験",
      services: "サービス",
      search: "検索",
      night: "泊",
      referHost: "ホストを紹介する",
      findCoHost: "共同ホストを探す",
      aboutSpace: "このリスティングについて",
      whatOffers: "アメニティ・設備",
      reviews: "件のレビュー",
      review: "件のレビュー",
      noReviews: "レビューはまだありません。",
      lengthStay: "滞在日数（一晩）",
      adults: "大人",
      children: "子供",
      infants: "乳幼児",
      pets: "ペット",
      cleaningFee: "清掃料金",
      serviceFee: "Airbnbサービス料",
      totalBeforeTaxes: "税引前合計金額",
      reserveHouse: "予約する",
      noChargedYet: "この段階ではまだ料金は請求されません",
      age13: "13歳以上",
      ages2: "2歳〜12歳",
      under2: "2歳未満",
      serviceAnimal: "介助動物を同伴しますか？",
      clearSearch: "条件をクリア",
      done: "完了",
      reset: "リセット",
      checkIn: "チェックイン",
      checkOut: "チェックアウト",
      selectDates: "日付を選択",
      popularDest: "人気の目的地",
      stayScheduled: "予約が完了しました！",
      success: "予約成功",
      confirmed: "予約が確定されました！"
    },
    KO: {
      becomeHost: "호스트 되기",
      helpCentre: "도움말 센터",
      loginSignup: "로그인 또는 가입",
      wishlist: "위시리스트",
      filters: "필터",
      where: "어디",
      when: "언제",
      who: "누구",
      searchDest: "목적지 검색",
      anywhere: "어디든지",
      anyWeek: "언제나",
      addGuests: "게스트 추가",
      homes: "숙소",
      experiences: "체험",
      services: "서비스",
      search: "검색",
      night: "박",
      referHost: "호스트 추천하기",
      findCoHost: "공동 호스트 찾기",
      aboutSpace: "숙소 설명",
      whatOffers: "숙소 편의시설",
      reviews: "개의 후기",
      review: "개의 후기",
      noReviews: "아직 작성된 후기가 없습니다.",
      lengthStay: "숙박 기간 (박)",
      adults: "성인",
      children: "어린이",
      infants: "유아",
      pets: "반려동물",
      cleaningFee: "청소비",
      serviceFee: "Airbnb 서비스 수수료",
      totalBeforeTaxes: "세금 계산 전 총액",
      reserveHouse: "예약하기",
      noChargedYet: "예약 확정 전에는 요금이 청구되지 않습니다",
      age13: "13세 이상",
      ages2: "2~12세",
      under2: "2세 미만",
      serviceAnimal: "보조동물을 동반하시나요?",
      clearSearch: "검색 지우기",
      done: "완료",
      reset: "재설정",
      checkIn: "체क인",
      checkOut: "체크아웃",
      selectDates: "날짜 선택",
      popularDest: "인기 여행지",
      stayScheduled: "숙박 예약이 완료되었습니다!",
      success: "예약 완료",
      confirmed: "예약 확정!"
    },
    ZH: {
      becomeHost: "成为房东",
      helpCentre: "帮助中心",
      loginSignup: "登录或注册",
      wishlist: "心愿单",
      filters: "筛选",
      where: "去哪里",
      when: "什么时候",
      who: "谁",
      searchDest: "搜索目的地",
      anywhere: "任何地方",
      anyWeek: "任意一周",
      addGuests: "添加人数",
      homes: "房源",
      experiences: "体验",
      services: "服务",
      search: "搜索",
      night: "晚",
      referHost: "推荐房东",
      findCoHost: "寻找联合房东",
      aboutSpace: "关于此房源",
      whatOffers: "房源配套设施",
      reviews: "条评价",
      review: "条评价",
      noReviews: "暂无评价。",
      lengthStay: "住宿晚数",
      adults: "成人",
      children: "儿童",
      infants: "婴儿",
      pets: "宠物",
      cleaningFee: "清洁费",
      serviceFee: "Airbnb 服务费",
      totalBeforeTaxes: "未税总价",
      reserveHouse: "预订房源",
      noChargedYet: "目前不会向您收费",
      age13: "满 13 岁",
      ages2: "2 - 12 岁",
      under2: "2 岁以下",
      serviceAnimal: "携带辅助动物？",
      clearSearch: "清除搜索内容",
      done: "完成",
      reset: "重置",
      checkIn: "入住",
      checkOut: "退房",
      selectDates: "选择日期",
      popularDest: "热门目的地",
      stayScheduled: "您的行程已排定！",
      success: "预订成功",
      confirmed: "预订已确认！"
    },
    HI: {
      becomeHost: "मेजबान बनें",
      helpCentre: "सहायता केंद्र",
      loginSignup: "लॉग इन या साइन अप करें",
      wishlist: "इच्छासूची",
      filters: "फ़िल्टर",
      where: "कहाँ",
      when: "कब",
      who: "कौन",
      searchDest: "गंतव्य खोजें",
      anywhere: "कहीं भी",
      anyWeek: "किसी भी सप्ताह",
      addGuests: "मेहमान जोड़ें",
      homes: "घर",
      experiences: "अनुभव",
      services: "सेवाएं",
      search: "खोजें",
      night: "रात",
      referHost: "एक मेजबान को रेफर करें",
      findCoHost: "सह-मेजबान खोजें",
      aboutSpace: "इस जगह के बारे में",
      whatOffers: "यह जगह क्या प्रदान करती है",
      reviews: "समीक्षाएं",
      review: "समीक्षा",
      noReviews: "इस सूची के लिए अभी तक कोई समीक्षा नहीं है।",
      lengthStay: "रुकने की अवधि (रातें)",
      adults: "वयस्क",
      children: "बच्चे",
      infants: "शिशु",
      pets: "पालतू जानवर",
      cleaningFee: "सफाई शुल्क",
      serviceFee: "Airbnb सेवा शुल्क",
      totalBeforeTaxes: "करों से पहले कुल",
      reserveHouse: "आरक्षित करें",
      noChargedYet: "अभी आपसे शुल्क नहीं लिया जाएगा",
      age13: "उम्र 13 या उससे अधिक",
      ages2: "उम्र 2 - 12",
      under2: "2 साल से कम",
      serviceAnimal: "क्या सर्विस जानवर ला रहे हैं?",
      clearSearch: "खोज साफ़ करें",
      done: "हो गया",
      reset: "रीसेट",
      checkIn: "चेक इन",
      checkOut: "चेक आउट",
      selectDates: "तारीखें चुनें",
      popularDest: "लोकप्रिय गंतव्य",
      stayScheduled: "आपका प्रवास निर्धारित है!",
      success: "आरक्षण सफल",
      confirmed: "आरक्षण की पुष्टि हो गई!"
    }
  };

  const formatPrice = (amountUsd) => {
    const rate = currencyRates[selectedCurrency.code] || 1.0;
    const convertedAmount = Math.round(amountUsd * rate);
    return `${selectedCurrency.symbol}${convertedAmount.toLocaleString()}`;
  };

  const t = (key) => {
    const langCode = selectedLanguage.code;
    const langTranslations = translations[langCode] || translations.EN;
    let val = langTranslations[key] || translations.EN[key];
    if (val) return val;

    // Fallbacks for extra keys
    const extraKeys = {
      nights: {
        EN: "nights", DE: "Nächte", FR: "nuits", ES: "noches", IT: "notti", PT: "noites", NL: "nachten", JA: "泊", KO: "박", ZH: "晚", HI: "रातें"
      },
      guest: {
        EN: "guest", DE: "Gast", FR: "voyageur", ES: "huésped", IT: "ospite", PT: "hóspede", NL: "gast", JA: "人", KO: "명", ZH: "人", HI: "मेहमान"
      },
      guests: {
        EN: "guests", DE: "Gäste", FR: "voyageurs", ES: "huéspedes", IT: "ospiti", PT: "hóspedes", NL: "gasten", JA: "人", KO: "명", ZH: "人", HI: "मेहमान"
      },
      addDates: {
        EN: "Add dates", DE: "Daten hinzufügen", FR: "Ajouter des dates", ES: "Añadir fechas", IT: "Aggiungi date", PT: "Adicionar datas", NL: "Datums toevoegen", JA: "日付を追加", KO: "날짜 추가", ZH: "添加日期", HI: "तारीखें जोड़ें"
      }
    };

    if (extraKeys[key]) {
      return extraKeys[key][langCode] || extraKeys[key].EN;
    }
    return key;
  };

  // Save listings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("airbnb_listings_v2", JSON.stringify(listings));
  }, [listings]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("airbnb_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Apply dark mode class to HTML document element
  useEffect(() => {
    localStorage.setItem("airbnb_dark_mode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleFavorite = (listingId) => {
    setWishlist((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      ...initialFilters,
      category: filters.category // retain category choice
    });
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
  };

  const addListing = (newListing) => {
    const listingWithId = {
      ...newListing,
      id: `lst_${Date.now()}`,
      rating: 5.0, // Initial rating for newly hosted places
      reviews: []
    };
    setListings((prev) => [listingWithId, ...prev]);
  };

  const openDetails = (listing) => {
    setSelectedListing(listing);
    setIsDetailsModalOpen(true);
  };

  const closeDetails = () => {
    setSelectedListing(null);
    setIsDetailsModalOpen(false);
  };

  // Compute total guests count
  const getGuestCount = () => {
    const { adults, children, infants, pets } = filters.guests;
    return adults + children + infants + pets;
  };

  // Filter listings based on current filters
  const filteredListings = listings.filter((listing) => {
    // 1. Category filter
    if (filters.category !== "All" && listing.category !== filters.category) {
      return false;
    }

    // 2. Location filter (case insensitive, partial match)
    if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // 3. Price filter
    if (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1]) {
      return false;
    }

    // 4. Type of place filter
    if (filters.typeOfPlace !== "Any") {
      const typeLower = listing.type.toLowerCase();
      const filterLower = filters.typeOfPlace.toLowerCase();
      if (filterLower === "entire home" && !typeLower.includes("entire") && !typeLower.includes("villa") && !typeLower.includes("cabin") && !typeLower.includes("lodge")) {
        return false;
      }
      if (filterLower === "private room" && !typeLower.includes("room") && !typeLower.includes("suite")) {
        return false;
      }
    }

    // 5. Guests filter
    const totalGuestsNeeded = filters.guests.adults + filters.guests.children;
    if (totalGuestsNeeded > 0 && listing.maxGuests < totalGuestsNeeded) {
      return false;
    }

    // 6. Amenities filter
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        listing.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    return true;
  });

  return (
    <AppContext.Provider
      value={{
        listings,
        wishlist,
        darkMode,
        filters,
        selectedListing,
        isFilterModalOpen,
        isDetailsModalOpen,
        isHostModalOpen,
        isWishlistDrawerOpen,
        isSearchExpanded,
        filteredListings,
        activeHeaderTab,
        setActiveHeaderTab,
        toggleDarkMode,
        toggleFavorite,
        updateFilters,
        resetFilters,
        clearAllFilters,
        addListing,
        openDetails,
        closeDetails,
        setIsFilterModalOpen,
        setIsHostModalOpen,
        setIsWishlistDrawerOpen,
        setIsSearchExpanded,
        getGuestCount,
        selectedLanguage,
        setSelectedLanguage,
        selectedCurrency,
        setSelectedCurrency,
        isLangModalOpen,
        setIsLangModalOpen,
        formatPrice,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
