<script setup>
import { useDocument, useCollection } from "vuefire";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useCurrentUser } from "vuefire";
import { useDataStore } from "../stores/data";
import { Icon } from "@iconify/vue";

import AccountsTable from "../components/AccountsTable.vue";
import AddAccountSidebar from "../components/AddAccountSidebar.vue";

const dataStore = useDataStore();

const user = useCurrentUser();
let dataUsuario = null;

// Consulta si el usuario se ha registrado anteriormente
try {
	dataUsuario = useDocument(doc(collection(db, dataStore.principalCollection), user.value.uid));
	if (!dataUsuario.value) {
		createUserInDatabase();
	}
	getCuentas();
} catch (error) {
	console.log(error);
}

//Crea el espacio del usuario dentro de la colección
async function createUserInDatabase() {
	const createUserRef = await setDoc(doc(db, dataStore.principalCollection, user.value.uid), {
		email: user.value.email,
		emailVerified: user.value.emailVerified,
		uid: user.value.uid,
		providerData: user.value.providerData,
		displayName: user.value.displayName,
	});
}

//Consulta las cuentas registradas del usuario
// async function getCuentas() {
// 	const cuentasCol = collection(db, dataStore.principalCollection, user.value.uid, "cuentas");
// 	const cuentasSnapshot = await getDocs(cuentasCol);
// 	dataStore.setCuentas(cuentasSnapshot.docs.map((doc) => doc.data()));
// }
dataStore.getCuentas();
</script>

<template>
	<div class="container mx-auto mt-12">
		<AccountsTable :cuentas="dataStore.cuentas" />
		<!-- Modal toggle -->
		<button
			data-modal-target="defaultModal"
			data-modal-toggle="defaultModal"
			class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 ml-auto mt-4"
			type="button"
			id="openbutton"
		>
			<Icon icon="uil:plus-circle" class="text-xl" />
			Agregar cuenta
		</button>
		<AddAccountSidebar />
	</div>
</template>
