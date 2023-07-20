<script setup>
import { onMounted } from "vue";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { useRouter } from "vue-router";

import { googleAuthProvider } from "../firebase/firebase";

const auth = useFirebaseAuth();

const user = useCurrentUser();

const router = useRouter();

const error = null;
function signinRedirect() {
	signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
		console.error("Failed signinRedirect", reason);
		error.value = reason;
	});
}

onMounted(() => {
	getRedirectResult(auth)
		.then(() => {
			if (auth.currentUser) {
				router.push("/dashboard");
			} else {
				router.push("/login");
			}
		})
		.catch((reason) => {
			console.error("Failed redirect result", reason);
			error.value = reason;
		});
	// console.log(user);
});
</script>

<template>
	<div
		class="relative w-full max-w-sm p-4 mx-auto mt-24 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
	>
		<form class="space-y-6" action="#">
			<h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
			<!-- <p v-if="user">Hello {{ user.displayName }}</p> -->
			<button @click="signinRedirect()">SignIn with Google</button>
			<!-- <button @click="logout()">Logout</button> -->
			<div class="text-center">
				<button
					@click="signinRedirect()"
					type="button"
					class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
				>
					<svg
						class="w-4 h-4 mr-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 18 19"
					>
						<path
							fill-rule="evenodd"
							d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
							clip-rule="evenodd"
						/>
					</svg>
					Sign in with Google
				</button>
			</div>
			<div
				v-if="error"
				class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
				role="alert"
			>
				{{ error }}
			</div>
		</form>
	</div>
</template>

<style></style>
