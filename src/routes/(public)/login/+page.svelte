<script lang="ts">
	let { form } = $props();
	let loading = $state(false);
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
		<div
			class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
				<h1
					class="text-center text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Bem vindo(a) de volta
				</h1>
				<form class="space-y-4 md:space-y-6" action="#">
					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>Seu email</label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-emerald-600 focus:ring-emerald-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							placeholder="meu@email.com.br"
							required
						/>
					</div>
					<div>
						<label
							for="password"
							class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Senha</label
						>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-emerald-600 focus:ring-emerald-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							required
						/>
					</div>
					<div class="flex items-center justify-between">
						<a
							href="/"
							class="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-500"
							>Esqueceu sua senha?</a
						>
					</div>
					<button
						type="submit"
						class="w-full rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
						>Entrar</button
					>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Ainda não tem uma conta? <a
							href="/"
							class="font-medium text-emerald-600 hover:underline dark:text-emerald-500"
							>Cadastre-se</a
						>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
