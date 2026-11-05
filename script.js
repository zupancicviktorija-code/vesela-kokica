
const obrazec = document.getElementById("rezervacija-form");
const potrditev = document.getElementById("potrditev");
const datumPolje = document.getElementById("datum");

// Nastavimo najzgodnejši dovoljeni datum.
const danes = new Date();
const lokalniDatum = new Date(
    danes.getTime() - danes.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

datumPolje.min = lokalniDatum;


const gumbiPaketov = document.querySelectorAll(".izberi-paket");

gumbiPaketov.forEach(function(gumb) {

    gumb.addEventListener("click", function() {

        const izbraniPaket = gumb.dataset.paket;

        document.getElementById("paket").value = izbraniPaket;

    });

});


const izbiraPaketa = document.getElementById("paket");
const prikazPaketa = document.getElementById("ime-paketa");
const prikazCene = document.getElementById("skupna-cena");

// Cene posameznih paketov

const cenePaketov = {
    "Mini kino": 19.90,
    "Kino za dva": 34.90,
    "VIP večer": 59.90,
    "Kino pod zvezdami": 89.90,
    "Filmska zabava": 69.90
};


// Funkcija za posodobitev cene

function posodobiCeno() {
    const izbraniPaket = izbiraPaketa.value;

    // Osnovna cena paketa
    let skupnaCena = cenePaketov[izbraniPaket] || 0;

    // Poiščemo vse označene dodatke
    const izbraniDodatki =
        document.querySelectorAll(".dodatek:checked");

    // Prištejemo ceno vsakega dodatka
    izbraniDodatki.forEach(function(dodatek) {
        skupnaCena += Number(dodatek.value);
    });

    // Prikažemo rezultat
    prikazPaketa.textContent =
        izbraniPaket || "Ni izbran";

    prikazCene.textContent =
        skupnaCena.toFixed(2).replace(".", ",") + " €";
}


// Ko uporabnik spremeni paket
izbiraPaketa.addEventListener("change", posodobiCeno);

// Ko uporabnik klikne paket v ponudbi
gumbiPaketov.forEach(function(gumb) {
    gumb.addEventListener("click", posodobiCeno);
});

// Začetni prikaz
posodobiCeno();


const dodatki = document.querySelectorAll(".dodatek");

dodatki.forEach(function(dodatek) {
    dodatek.addEventListener("change", posodobiCeno);
});


obrazec.addEventListener("submit", function(event) {
    event.preventDefault();

    const ime = document.getElementById("ime").value.trim();
    const paket = document.getElementById("paket").value;
    const datum = document.getElementById("datum").value;

    // Poiščemo izbrane dodatke.
    const izbraniDodatki =
        document.querySelectorAll(".dodatek:checked");

    let skupnaCena = cenePaketov[paket] || 0;
    let seznamDodatkov = [];

    izbraniDodatki.forEach(function(dodatek) {
        skupnaCena += Number(dodatek.value);

        const naziv = dodatek.parentElement.textContent.trim();
        seznamDodatkov.push(naziv);
    });

    // Izpolnimo potrdilo.
    document.getElementById("potrjeno-ime").textContent = ime;
    document.getElementById("potrjen-paket").textContent = paket;

    document.getElementById("potrjeni-dodatki").textContent =
        seznamDodatkov.length > 0
            ? seznamDodatkov.join(", ")
            : "Brez dodatkov";

    const [leto, mesec, dan] = datum.split("-");

    document.getElementById("potrjen-datum").textContent =
        `${dan}. ${mesec}. ${leto}`;

    document.getElementById("potrjena-cena").textContent =
        skupnaCena.toFixed(2).replace(".", ",") + " €";

    // Prikažemo potrdilo.
    potrditev.hidden = false;

    // Ponastavimo obrazec in prikaz cene.
    obrazec.reset();
    posodobiCeno();

    // Premaknemo se do potrdila.
    potrditev.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});


/* =====================================
   FILMSKI IZZIVI – NAKLJUČNE KARTICE
===================================== */

const karticeIzzivov = [
    "images/izziv1.png",
    "images/izziv2.png",
    "images/izziv3.png",
    "images/izziv4.png"
];

const gumbIzziv = document.getElementById("gumb-izziv");
const trenutniIzziv = document.getElementById("trenutni-izziv");
const stevecIzzivov = document.getElementById("izzivi-stevec");

let preostaliIzzivi = [...karticeIzzivov];
let steviloIzvlecenih = 0;

gumbIzziv.addEventListener("click", function () {

    // Ko zmanjka kartic, jih ponovno premešamo.
    if (preostaliIzzivi.length === 0) {
        preostaliIzzivi = [...karticeIzzivov];
        steviloIzvlecenih = 0;
    }

    // Naključno izberemo kartico.
    const nakljucniIndeks = Math.floor(
        Math.random() * preostaliIzzivi.length
    );

    // Izbrano kartico odstranimo iz preostalih.
    const izbranaKartica = preostaliIzzivi.splice(
        nakljucniIndeks, 1
    )[0];

    // Prikažemo izbrani izziv.
    trenutniIzziv.src = izbranaKartica;

    steviloIzvlecenih++;

    // Posodobimo števec.
    stevecIzzivov.textContent =
        "Izvlečenih izzivov: " +
        steviloIzvlecenih +
        " / " +
        karticeIzzivov.length;

    // Spremenimo besedilo gumba.
    if (preostaliIzzivi.length === 0) {
        gumbIzziv.textContent = "🔄 Premešaj in igraj znova";
    } else {
        gumbIzziv.textContent = "🎲 Naslednji izziv";
    }

});


/* =====================================
   NAROČANJE FILMSKIH IZZIVOV
===================================== */

const narociloForm = document.getElementById("narocilo-form");
const narociloKolicina = document.getElementById("narocilo-kolicina");
const narociloCena = document.getElementById("narocilo-cena");
const narociloPotrditev = document.getElementById("narocilo-potrditev");

const cenaKompleta = 12.90;

// Izračun skupne cene
function posodobiCenoKartic() {
    const kolicina = Number(narociloKolicina.value);

    if (!Number.isInteger(kolicina) || kolicina < 1 || kolicina > 20) {
        narociloCena.textContent = "—";
        return;
    }

    const skupaj = kolicina * cenaKompleta;

    narociloCena.textContent =
        skupaj.toFixed(2).replace(".", ",") + " €";
}

// Cena se spremeni ob spremembi količine
narociloKolicina.addEventListener("input", posodobiCenoKartic);

// Potrditev naročila
narociloForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const ime = document.getElementById("narocilo-ime").value.trim();
    const kolicina = Number(narociloKolicina.value);

    if (!ime || !Number.isInteger(kolicina) || kolicina < 1 || kolicina > 20) {
        return;
    }

    const skupaj = kolicina * cenaKompleta;

    const sporocilo = document.getElementById("narocilo-sporocilo");

    sporocilo.textContent =
        ime + ", tvoje naročilo za " +
        kolicina + " komplet(ov) Filmskih izzivov " +
        "v vrednosti " +
        skupaj.toFixed(2).replace(".", ",") +
        " € je pripravljeno.";

    // Prikažemo potrditev
    narociloPotrditev.hidden = false;

    // Ponastavimo obrazec
    narociloForm.reset();
    posodobiCenoKartic();

    // Premaknemo se do potrditve
    narociloPotrditev.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Začetni izračun
posodobiCenoKartic();



/* =====================================
   MNENJA OBISKOVALCEV – SUPABASE
===================================== */

const mnenjaForm = document.getElementById("mnenja-form");
const seznamMnenj = document.getElementById("seznam-mnenj");

// Prikaz odobrenih mnenj
async function prikaziMnenja() {

    const { data, error } = await supabaseClient
        .from("mnenja")
        .select("ime, ocena, besedilo")
        .eq("odobreno", true)
        .order("ustvarjeno", { ascending: false });

    seznamMnenj.replaceChildren();

    if (error) {
        const sporocilo = document.createElement("p");
        sporocilo.textContent =
            "Mnenj trenutno ni mogoče naložiti.";
        seznamMnenj.appendChild(sporocilo);
        console.error(error);
        return;
    }

    if (data.length === 0) {
        const sporocilo = document.createElement("p");
        sporocilo.textContent =
            "Bodi prvi, ki deli svojo izkušnjo! 🍿";
        seznamMnenj.appendChild(sporocilo);
        return;
    }

    data.forEach(function(mnenje) {

        const kartica = document.createElement("div");
        kartica.className = "mnenje-kartica";

        const ime = document.createElement("h3");
        ime.textContent = mnenje.ime;

        const zvezdice = document.createElement("p");
        zvezdice.className = "mnenje-zvezdice";
        zvezdice.textContent = "⭐".repeat(mnenje.ocena);

        const besedilo = document.createElement("p");
        besedilo.textContent = mnenje.besedilo;

        kartica.appendChild(ime);
        kartica.appendChild(zvezdice);
        kartica.appendChild(besedilo);

        seznamMnenj.appendChild(kartica);
    });
}

// Oddaja novega mnenja


/* OMEJITEV PONOVNE ODDAJE MNENJA */

const casMedMnenji = 60 * 1000;

let zadnjaOddaja = Number(
    localStorage.getItem("veselaKokicaZadnjaOddaja") || 0
);

mnenjaForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const trenutniCas = Date.now();

    if (trenutniCas - zadnjaOddaja < casMedMnenji) {
        const preostaleSekunde = Math.ceil(
            (casMedMnenji - (trenutniCas - zadnjaOddaja)) / 1000
        );

        alert(
            "🍿 Pred naslednjim mnenjem počakaj še " +
            preostaleSekunde + " sekund."
        );

        return;
    }


    const ime = document.getElementById("mnenje-ime").value.trim();
    const ocena = Number(
        document.getElementById("mnenje-ocena").value
    );
    const besedilo = document.getElementById("mnenje-besedilo").value.trim();

    if (
        !ime ||
        !besedilo ||
        !Number.isInteger(ocena) ||
        ocena < 1 ||
        ocena > 5
    ) {
        return;
    }

    const gumb = mnenjaForm.querySelector('button[type="submit"]');
    gumb.disabled = true;

    const { error } = await supabaseClient
        .from("mnenja")
        .insert({
            ime: ime,
            ocena: ocena,
            besedilo: besedilo
        });

    gumb.disabled = false;

    if (error) {
        console.error("Napaka pri oddaji mnenja:", error);
        alert("Mnenja ni bilo mogoče oddati. Poskusi znova.");
        return;
    }

    
    zadnjaOddaja = Date.now();

    localStorage.setItem(
        "veselaKokicaZadnjaOddaja",
        zadnjaOddaja
    );

    alert("🍿 Hvala! Tvoje mnenje je poslano v pregled in bo objavljeno po odobritvi.");

    mnenjaForm.reset();
});


// Prikaz mnenj ob odprtju strani
prikaziMnenja();



/* PREVERJANJE POVEZAVE S SUPABASE */

async function preveriSupabase() {
    const { data, error } = await supabaseClient
        .from("mnenja")
        .select("id, ime, ocena, besedilo")
        .limit(1);

    if (error) {
        console.error("Napaka pri povezavi s Supabase:", error);
    } else {
        console.log("✅ Povezava s Supabase deluje!");
        console.log("Podatki:", data);
    }
}

preveriSupabase();
