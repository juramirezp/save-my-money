<script setup>
import { onMounted, ref } from "vue";
import { Modal } from "flowbite";
import { useCurrentUser } from "vuefire";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDataStore } from "../stores/data";
import { Icon } from "@iconify/vue";

const user = useCurrentUser();
const dataStore = useDataStore();
const savingData = ref(false);
const modal = ref();

const cuenta = ref({
	nombre: "",
	monto: null,
	tipo_de_gasto: "gasto_fijo",
	duracion: null,
	mes_de_inicio: 1,
});

//Crea el espacio del usuario dentro de la colección
async function addAccountToUser() {
	try {
		const createAccountRef = await addDoc(
			collection(db, dataStore.principalCollection, user.value.uid, "cuentas"),
			cuenta.value
		);
		dataStore.getCuentas();
		savingData.value = false;
		modal.value.hide();
	} catch (error) {
		console.log(error);
	}
}

onMounted(() => {
	const $buttonElement = document.querySelector("#openbutton");
	const $modalElement = document.querySelector("#defaultModal");
	const $closeButtons = document.querySelectorAll("#defaultModal .closeButton");

	const modalOptions = {
		backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
		backdrop: "static",
	};

	modal.value = new Modal($modalElement, modalOptions);

	if ($modalElement) {
		$buttonElement.addEventListener("click", () => modal.value.toggle());

		$closeButtons.forEach(($closeButton) => {
			$closeButton.addEventListener("click", () => {
				if (!savingData.value) {
					modal.value.hide();
				}
			});
		});

		// programmatically show
		//modal.show();
	}
});
</script>

<template>
	<!-- Main modal -->
	<div
		id="defaultModal"
		tabindex="-1"
		aria-hidden="true"
		class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
	>
		<div class="relative w-full max-w-2xl max-h-full">
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar cuenta</h3>
					<button
						type="button"
						class="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white closeButton"
						data-modal-hide="defaultModal"
						id="closeButton"
					>
						<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<div class="p-6 space-y-6">
					<div>
						<label for="cuentaNombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Nombre
						</label>
						<input
							type="text"
							id="cuentaNombre"
							aria-describedby="helper-text-explanation"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="ej. Luz, Prestamo, etc."
							v-model="cuenta.nombre"
						/>
					</div>
					<div>
						<label for="cuentaMonto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto</label>
						<input
							type="number"
							id="cuentaMonto"
							min="1"
							max="99999999"
							aria-describedby="helper-text-explanation"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="ej. 30000"
							v-model="cuenta.monto"
						/>
					</div>

					<div>
						<label for="cuentaTipoGasto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Tipo de Gasto
						</label>
						<select
							id="cuentaTipoGasto"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							v-model="cuenta.tipo_de_gasto"
						>
							<option value="gasto_fijo">Gasto Fijo (Duración indefinida)</option>
							<option value="cuotas">Pago en cuotas (Duración de X meses)</option>
							<option value="ocacional">Gasto ocasional del mes (Valido solo por un mes)</option>
						</select>
					</div>

					<div>
						<label for="cuentaDuracion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Duración
						</label>
						<input
							type="number"
							id="cuentaDuracion"
							min="1"
							max="99"
							aria-describedby="helper-text-explanation"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="ej. 6"
							v-model="cuenta.duracion"
						/>
						<p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
							Número de meses que esta cuenta aparecerá en tus gastos
						</p>
					</div>

					<div>
						<label for="cuentaMesDeInicio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Mes de inicio
						</label>
						<select
							id="cuentaMesDeInicio"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							v-model="cuenta.mes_de_inicio"
						>
							<option value="1">Enero</option>
							<option value="2">Febrero</option>
							<option value="3">Marzo</option>
							<option value="4">Abril</option>
							<option value="5">Mayo</option>
							<option value="6">Junio</option>
							<option value="7">Julio</option>
							<option value="8">Agosto</option>
							<option value="9">Septiembre</option>
							<option value="10">Octubre</option>
							<option value="11">Noviembre</option>
							<option value="12">Diciembre</option>
						</select>
					</div>
				</div>
				<!-- Modal footer -->
				<div
					class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
				>
					<Icon icon="svg-spinners:ring-resize" class="text-2xl text-teal-400" v-if="savingData" />
					<button
						type="button"
						@click="addAccountToUser(), (savingData = true)"
						:disabled="savingData"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:pointer-events-none disabled:opacity-70"
					>
						Guardar
					</button>
					<button
						data-modal-hide="defaultModal"
						type="button"
						:disabled="savingData"
						class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 disabled:pointer-events-none disabled:opacity-70 closeButton"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
