<script setup>
const props = defineProps(["cuentas"]);
</script>

<template>
	<h1 class="text-xl font-bold">Cuentas registradas</h1>
	<div class="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3">#</th>
					<th scope="col" class="px-6 py-3">Nombre</th>
					<th scope="col" class="px-6 py-3">Tipo de Gasto</th>
					<th scope="col" class="px-6 py-3">Monto</th>
					<th scope="col" class="px-6 py-3">Acciones</th>
				</tr>
			</thead>
			<tbody v-if="props.cuentas.length > 0">
				<tr
					class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
					v-for="(cuenta, index) in props.cuentas"
					:key="index"
				>
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
						{{ index + 1 }}
					</th>
					<td class="px-6 py-4">{{ cuenta.nombre }}</td>
					<td class="px-6 py-4">{{ cuenta.tipo_de_gasto }}</td>
					<td class="px-6 py-4">{{ cuenta.monto }}</td>
					<td class="px-6 py-4">
						<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<td class="px-6 py-4 font-bold text-center" colspan="5">No tienes cuentas registradas</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
