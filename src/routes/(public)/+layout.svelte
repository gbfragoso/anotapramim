<script lang="ts">
	let { children } = $props();
</script>

<header>
	<nav class="border-gray-200 bg-white px-4 py-2.5 lg:px-6 dark:bg-gray-800">
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
			<a href="/" class="flex items-center self-center text-xl font-semibold dark:text-white">
				<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
					><path
						class="text-emerald-600"
						fill="currentColor"
						d="M13.5 2c0 .444-.193.843-.5 1.118V5h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h5V3.118A1.5 1.5 0 1 1 13.5 2M6 7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-4 3H0v6h2zm20 0h2v6h-2zM9 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
					/></svg
				>&nbsp;Anota pra mim?
			</a>
			<div class="flex items-center lg:order-2">
				<a
					href="/login"
					class="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none lg:px-5 lg:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
					>Login</a
				>
				<a
					href="/"
					class="mr-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 focus:outline-none lg:px-5 lg:py-2.5 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
					>Cadastre-se</a
				>
				<button
					data-collapse-toggle="mobile-menu-2"
					type="button"
					class="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="mobile-menu-2"
					aria-expanded="false"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-6 w-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clip-rule="evenodd"
						></path></svg
					>
					<svg
						class="hidden h-6 w-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path></svg
					>
				</button>
			</div>
			<div
				class="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
				id="mobile-menu-2"
			>
				<ul class="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
					<li>
						<a
							href="/"
							class="block rounded bg-emerald-700 py-2 pr-4 pl-3 text-white lg:bg-transparent lg:p-0 lg:text-emerald-700 dark:text-white"
							aria-current="page">Home</a
						>
					</li>
					<li>
						<a
							href="/#beneficios"
							class="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-emerald-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
							>Benefícios</a
						>
					</li>
					<li>
						<a
							href="/#planos"
							class="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-emerald-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
							>Planos</a
						>
					</li>
					<li>
						<a
							href="/#faq"
							class="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-emerald-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
							>FAQ</a
						>
					</li>
					<li>
						<a
							href="/contact"
							class="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-emerald-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
							>Contato</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>
{@render children?.()}
