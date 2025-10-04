<script lang="ts">
	let { children } = $props();
	let colorTheme = $state('light');

	function toggleSidebarMobile() {
		const sidebar = document.getElementById('sidebar');

		if (sidebar) {
			const sidebarBackdrop = document.getElementById('sidebarBackdrop');
			const toggleSidebarMobileHamburger = document.getElementById('toggleSidebarMobileHamburger');
			const toggleSidebarMobileClose = document.getElementById('toggleSidebarMobileClose');

			sidebar.classList.toggle('hidden');
			sidebarBackdrop?.classList.toggle('hidden');
			toggleSidebarMobileHamburger?.classList.toggle('hidden');
			toggleSidebarMobileClose?.classList.toggle('hidden');
		}
	}

	function themeToggle() {
		let event = new Event('dark-mode');

		const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
		const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
		themeToggleDarkIcon?.classList.toggle('hidden');
		themeToggleLightIcon?.classList.toggle('hidden');

		if (colorTheme) {
			if (colorTheme === 'light') {
				document.documentElement.classList.add('dark');
				colorTheme = 'dark';
			} else {
				document.documentElement.classList.remove('dark');
				colorTheme = 'light';
			}
		} else {
			if (document.documentElement.classList.contains('dark')) {
				document.documentElement.classList.remove('dark');
				colorTheme = 'light';
			} else {
				document.documentElement.classList.add('dark');
				colorTheme = 'dark';
			}
		}

		document.dispatchEvent(event);
	}
</script>

<div class="bg-gray-50 dark:bg-gray-800">
	<nav
		class="fixed z-30 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="px-3 py-3 lg:px-5 lg:pl-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-start">
					<button
						id="toggleSidebarMobile"
						aria-label="toggleSidebarMobile"
						aria-expanded="true"
						aria-controls="sidebar"
						onclick={toggleSidebarMobile}
						class="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
					>
						<svg
							id="toggleSidebarMobileHamburger"
							class="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clip-rule="evenodd"
							></path></svg
						>
						<svg
							id="toggleSidebarMobileClose"
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
					<a href="/" class="flex items-center self-center text-xl font-semibold dark:text-white">
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
							><path
								class="text-emerald-600"
								fill="currentColor"
								d="M13.5 2c0 .444-.193.843-.5 1.118V5h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h5V3.118A1.5 1.5 0 1 1 13.5 2M6 7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-4 3H0v6h2zm20 0h2v6h-2zM9 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
							/></svg
						>&nbsp;Anota pra mim?
					</a>
				</div>
				<div class="flex items-center">
					<div class="mr-3 -mb-1 hidden sm:block">
						<span></span>
					</div>

					<button
						type="button"
						data-dropdown-toggle="notification-dropdown"
						class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						<span class="sr-only">View notifications</span>

						<svg
							class="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
							></path></svg
						>
					</button>

					<div
						class="z-50 my-4 hidden max-w-sm list-none divide-y divide-gray-100 overflow-hidden rounded bg-white text-base shadow-lg dark:divide-gray-600 dark:bg-gray-700"
						id="notification-dropdown"
						style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(2396px, 65px);"
						data-popper-placement="bottom"
					>
						<div
							class="block bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-400"
						>
							Notifications
						</div>
						<div>
							<a
								href="#"
								class="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
							>
								<div class="flex-shrink-0">
									<img
										class="h-11 w-11 rounded-full"
										src="https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green.png"
										alt="Jese image"
									/>
									<div
										class="bg-primary-700 absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white dark:border-gray-700"
									>
										<svg
											class="h-3 w-3 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
											></path><path
												d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
											></path></svg
										>
									</div>
								</div>
								<div class="w-full pl-3">
									<div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
										New message from <span class="font-semibold text-gray-900 dark:text-white"
											>Bonnie Green</span
										>: "Hey, what's up? All set for the presentation?"
									</div>
									<div class="text-primary-700 dark:text-primary-400 text-xs font-medium">
										a few moments ago
									</div>
								</div>
							</a>
							<a
								href="#"
								class="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
							>
								<div class="flex-shrink-0">
									<img
										class="h-11 w-11 rounded-full"
										src="https://flowbite-admin-dashboard.vercel.app/images/users/jese-leos.png"
										alt="Jese image"
									/>
									<div
										class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gray-900 dark:border-gray-700"
									>
										<svg
											class="h-3 w-3 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
											></path></svg
										>
									</div>
								</div>
								<div class="w-full pl-3">
									<div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
										<span class="font-semibold text-gray-900 dark:text-white">Jese leos</span> and
										<span class="font-medium text-gray-900 dark:text-white">5 others</span> started following
										you.
									</div>
									<div class="text-primary-700 dark:text-primary-400 text-xs font-medium">
										10 minutes ago
									</div>
								</div>
							</a>
							<a
								href="#"
								class="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
							>
								<div class="flex-shrink-0">
									<img
										class="h-11 w-11 rounded-full"
										src="https://flowbite-admin-dashboard.vercel.app/images/users/joseph-mcfall.png"
										alt="Joseph image"
									/>
									<div
										class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-600 dark:border-gray-700"
									>
										<svg
											class="h-3 w-3 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clip-rule="evenodd"
											></path></svg
										>
									</div>
								</div>
								<div class="w-full pl-3">
									<div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
										<span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span>
										and <span class="font-medium text-gray-900 dark:text-white">141 others</span> love
										your story. See it and view more stories.
									</div>
									<div class="text-primary-700 dark:text-primary-400 text-xs font-medium">
										44 minutes ago
									</div>
								</div>
							</a>
							<a
								href="#"
								class="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
							>
								<div class="flex-shrink-0">
									<img
										class="h-11 w-11 rounded-full"
										src="https://flowbite-admin-dashboard.vercel.app/images/users/leslie-livingston.png"
										alt="Leslie image"
									/>
									<div
										class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-green-400 dark:border-gray-700"
									>
										<svg
											class="h-3 w-3 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
												clip-rule="evenodd"
											></path></svg
										>
									</div>
								</div>
								<div class="w-full pl-3">
									<div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
										<span class="font-semibold text-gray-900 dark:text-white"
											>Leslie Livingston</span
										>
										mentioned you in a comment:
										<span class="text-primary-700 dark:text-primary-500 font-medium"
											>@bonnie.green</span
										> what do you say?
									</div>
									<div class="text-primary-700 dark:text-primary-400 text-xs font-medium">
										1 hour ago
									</div>
								</div>
							</a>
							<a href="#" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600">
								<div class="flex-shrink-0">
									<img
										class="h-11 w-11 rounded-full"
										src="https://flowbite-admin-dashboard.vercel.app/images/users/robert-brown.png"
										alt="Robert image"
									/>
									<div
										class="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500 dark:border-gray-700"
									>
										<svg
											class="h-3 w-3 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
											></path></svg
										>
									</div>
								</div>
								<div class="w-full pl-3">
									<div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
										<span class="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted
										a new video: Glassmorphism - learn how to implement the new design trend.
									</div>
									<div class="text-primary-700 dark:text-primary-400 text-xs font-medium">
										3 hours ago
									</div>
								</div>
							</a>
						</div>
						<a
							href="#"
							class="block bg-gray-50 py-2 text-center text-base font-normal text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
						>
							<div class="inline-flex items-center">
								<svg
									class="mr-2 h-5 w-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path
										fill-rule="evenodd"
										d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
										clip-rule="evenodd"
									></path></svg
								>
								View all
							</div>
						</a>
					</div>

					<button
						id="theme-toggle"
						aria-label="theme-toggle"
						data-tooltip-target="tooltip-toggle"
						type="button"
						onclick={themeToggle}
						class="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
					>
						<svg
							id="theme-toggle-dark-icon"
							class="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
							></path></svg
						>
						<svg
							id="theme-toggle-light-icon"
							class="hidden h-5 w-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
								fill-rule="evenodd"
								clip-rule="evenodd"
							></path></svg
						>
					</button>
					<div
						id="tooltip-toggle"
						role="tooltip"
						class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
						style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(2404px, 63px);"
						data-popper-placement="bottom"
					>
						Toggle dark mode
						<div
							class="tooltip-arrow"
							data-popper-arrow=""
							style="position: absolute; left: 0px; transform: translate(69px);"
						></div>
					</div>

					<div class="ml-3 flex items-center">
						<div>
							<button
								type="button"
								class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								id="user-menu-button-2"
								aria-expanded="false"
								data-dropdown-toggle="dropdown-2"
							>
								<span class="sr-only">Open user menu</span>
								<img
									class="h-8 w-8 rounded-full"
									src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
									alt="user photo"
								/>
							</button>
						</div>

						<div
							class="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
							id="dropdown-2"
							style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(2524px, 61px);"
							data-popper-placement="bottom"
						>
							<div class="px-4 py-3" role="none">
								<p class="text-sm text-gray-900 dark:text-white" role="none">Neil Sims</p>
								<p
									class="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
									role="none"
								>
									neil.sims@flowbite.com
								</p>
							</div>
							<ul class="py-1" role="none">
								<li>
									<a
										href="/"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem">Dashboard</a
									>
								</li>
								<li>
									<a
										href="/settings"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem">Configurações</a
									>
								</li>
								<li>
									<a
										href="/logout"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem">Sair</a
									>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
	<div class="flex overflow-hidden bg-gray-50 pt-16 dark:bg-gray-900">
		<aside
			id="sidebar"
			class="transition-width fixed top-0 left-0 z-20 flex hidden h-full w-64 flex-shrink-0 flex-col pt-16 font-normal duration-75 lg:flex"
			aria-label="Sidebar"
		>
			<div
				class="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white pt-0 dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
					<div
						class="flex-1 space-y-1 divide-y divide-gray-200 bg-white px-3 dark:divide-gray-700 dark:bg-gray-800"
					>
						<ul class="space-y-2 pb-2">
							<li>
								<form action="#" method="GET" class="lg:hidden">
									<label for="mobile-search" class="sr-only">Search</label>
									<div class="relative">
										<div
											class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
										>
											<svg
												class="h-5 w-5 text-gray-500"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
													clip-rule="evenodd"
												></path></svg
											>
										</div>
										<input
											type="text"
											name="email"
											id="mobile-search"
											class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
											placeholder="Search"
										/>
									</div>
								</form>
							</li>
							<li>
								<a
									href="/web/"
									class="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
										><g
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											><rect width="7" height="9" x="3" y="3" rx="1" /><rect
												width="7"
												height="5"
												x="14"
												y="3"
												rx="1"
											/><rect width="7" height="9" x="14" y="12" rx="1" /><rect
												width="7"
												height="5"
												x="3"
												y="16"
												rx="1"
											/></g
										></svg
									>
									<span class="ml-3">Dashboard</span>
								</a>
							</li>
							<li>
								<a
									href="/web/clientes"
									class="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
										><g
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											><path
												d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"
											/><circle cx="9" cy="7" r="4" /></g
										></svg
									>
									<span class="ml-3">Clientes</span>
								</a>
							</li>
							<li>
								<a
									href="/web/produtos"
									class="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
										><g
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											><path
												d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73zm1 .27V12"
											/><path d="M3.29 7L12 12l8.71-5M7.5 4.27l9 5.15" /></g
										></svg
									>
									<span class="ml-3">Produtos</span>
								</a>
							</li>
						</ul>
						<div class="space-y-2 pt-2">
							<a
								href="https://flowbite-admin-dashboard.vercel.app/settings/"
								class="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									><g
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										><path
											d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
										/><circle cx="12" cy="12" r="3" /></g
									></svg
								>
								<span class="ml-3">Configurações</span>
							</a>
							<a
								href="https://github.com/themesberg/flowbite-admin-dashboard/issues"
								target="_blank"
								class="group flex items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
									><g
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										><circle cx="12" cy="12" r="10" /><path
											d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"
										/></g
									></svg
								>
								<span class="ml-3">Ajuda</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</aside>

		<div
			class="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
			id="sidebarBackdrop"
		></div>

		<div
			id="main-content"
			class="relative h-full w-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
		>
			<main>
				{@render children?.()}
			</main>

			<p class="my-10 text-center text-sm text-gray-500">
				© 2025 <a href="/" class="hover:underline" target="_blank">Bitlogic Software</a>. All
				rights reserved.
			</p>
		</div>
	</div>
</div>
