import { ref } from "vue";
import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useCurrentUser } from "vuefire";

export const useDataStore = defineStore("data", () => {
	const principalCollection = ref("usuarios");
	const cuentas = ref();

	function setCuentas(data) {
		cuentas.value = data;
	}

	async function getCuentas() {
		const user = useCurrentUser();
		const cuentasCol = collection(db, "usuarios", user.value.uid, "cuentas");
		const cuentasSnapshot = await getDocs(cuentasCol);
		setCuentas(cuentasSnapshot.docs.map((doc) => doc.data()));
	}

	return { principalCollection, setCuentas, cuentas, getCuentas };
});
