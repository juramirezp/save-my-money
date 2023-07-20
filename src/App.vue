<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { signOut } from "firebase/auth";
import { useCurrentUser, useFirebaseAuth } from "vuefire";

const route = useRoute();
const router = useRouter();

const auth = useFirebaseAuth();

function logout() {
	signOut(auth)
		.then(() => {
			router.push("/login");
		})
		.catch((reason) => {
			console.error("Failed redirect result", reason);
			error.value = reason;
		});
}

onMounted(() => {
	initFlowbite();
});
</script>

<template>
	<!-- <p v-if="user">Hello {{ user.displayName }}</p> -->
	<header>
		<div class="wrapper">
			<nav class="bg-white border-gray-200 dark:bg-gray-900">
				<div class="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
					<RouterLink to="/" class="flex items-center">
						<img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
						<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Save My Money</span>
					</RouterLink>
					<button
						data-collapse-toggle="navbar-default"
						type="button"
						class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default"
						aria-expanded="false"
					>
						<span class="sr-only">Open main menu</span>
						<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
					<div class="hidden w-full md:block md:w-auto" id="navbar-default">
						<ul
							class="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
						>
							<li>
								<RouterLink
									to="/"
									:class="{
										'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500':
											route.path == '/',
										'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent':
											route.path != '/',
									}"
									aria-current="page"
								>
									Home
								</RouterLink>
							</li>
							<li v-if="auth.currentUser">
								<RouterLink
									to="/dashboard"
									:class="{
										'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500':
											route.path == '/dashboard',
										'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent':
											route.path != '/dashboard',
									}"
									aria-current="page"
								>
									Dashboard
								</RouterLink>
							</li>
							<li v-if="!auth.currentUser">
								<RouterLink
									to="/login"
									:class="{
										'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500':
											route.path == '/login',
										'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent':
											route.path != '/login',
									}"
								>
									Login
								</RouterLink>
							</li>
							<li v-if="auth.currentUser">
								<button
									@click="logout()"
									:class="{
										'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500':
											route.path == '/logout',
										'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent':
											route.path != '/logout',
									}"
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	</header>

	<RouterView />
</template>
