import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

import HomeView from "../views/HomeView.vue";
import Login from "../views/LoginGoogle.vue";
import Dashboard from "../views/Dashboard.vue";

const auth = useFirebaseAuth();

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: Dashboard,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
		},
		{
			path: "/logout",
			name: "Logout",
			component: Login,
		},
	],
});

// Añadir guardia de navegación
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const user = auth.currentUser;

	if (requiresAuth && !user) {
		next("/login");
	} else {
		next();
	}
});

// Verificar el estado de autenticación del usuario
onAuthStateChanged(auth, (user) => {
	if (user) {
		// Usuario autenticado, navegar a la página de Dashboard o permitir acceso a rutas protegidas
		router.push("/dashboard");
	} else {
		// Usuario no autenticado, redirigir a la página de inicio de sesión
		router.push("/login");
	}
});

export default router;
