<template>

  <Panel>
    <template v-slot:header>
      <title>{{__('panel')}}</title>
    </template>


    <template v-slot:content>
      <!-- Content header -->
      <div
          class="flex items-center justify-between px-4 py-2 text-primary-500 border-b md:py-4 dark:border-primary-darker">
        <div class="flex">
          <Bars2Icon class="h-7 w-7 mx-3"/>
          <h1 class="text-2xl font-semibold">{{ __('texts_list') }}</h1>
        </div>
        <div>
          <Link :href="route('panel.text.create')"
                class="inline-flex items-center  justify-center px-4 py-2 bg-green-500 border border-transparent rounded-md font-semibold  transition-all duration-500 text-white     hover:bg-green-600 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            {{ __('new_text') }}
          </Link>
        </div>
      </div>
      <!-- Content -->
      <div class="px-2 flex flex-col   md:px-4">

        <div class="flex-col   bg-white  overflow-x-auto shadow-lg  rounded-lg">
          <div class="flex   items-center justify-between py-4 dark:bg-gray-800 p-4">
            <!--              Dropdown Actions-->
            <div>
              <div class="relative mx-1  " data-te-dropdown-ref>
                <button
                    id="dropdownActionsSetting"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class=" inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">

                  <span class="sr-only">table actions</span>
                  <span>{{ __('bulk_actions') }}</span>
                  <ChevronDownIcon class="h-4 w-4 mx-1"/>
                </button>

                <!--     menu -->
                <div ref="actionsMenu" data-te-dropdown-menu-ref
                     class="min-w-[12rem] absolute z-[1000] float-start m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-start text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                     tabindex="-1" role="menu" aria-orientation="vertical" aria-label="Actions menu"

                     aria-labelledby="dropdownActionsSetting">

                </div>
              </div>
            </div>
            <!--              Dropdown Paginate-->
            <div class="flex items-center">
              <div class="relative mx-1  " data-te-dropdown-ref>
                <button
                    id="dropdownPaginate"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class=" inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">

                  <span class="sr-only">table actions</span>
                  <span>{{ params.paginate }}</span>
                  <ChevronDownIcon class="h-4 w-4 mx-1"/>
                </button>

                <!--     menu -->
                <div ref="userMenu" data-te-dropdown-menu-ref
                     class="min-w-[12rem] absolute z-[1000] start-0 text-gray-500  m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-start text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                     tabindex="-1" role="menu" aria-orientation="vertical" aria-label="User menu"

                     aria-labelledby="dropdownPaginate">
                  <div v-for=" num in $page.props.pageItems " class="">
                    <div @click="params.paginate=num;getData()" role="menuitem"
                         class=" cursor-pointer  select-none block  p-2 px-6 text-sm   transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">
                      {{ num }}
                    </div>
                    <hr class="border-gray-200 dark:border-gray-700 ">
                  </div>
                </div>
              </div>

              <!--                Paginate-->
              <Pagination @paginationChanged="paginationChanged" :pagination="pagination"/>
            </div>

            <div class="relative ">
              <label for="table-search" class="sr-only">Search</label>
              <div
                  class="absolute inset-y-0 cursor-pointer text-gray-500 hover:text-gray-700  start-0 flex items-center px-3  ">
                <MagnifyingGlassIcon @click=" getData() " class="w-4 h-4  dark:text-gray-400"/>
              </div>
              <div
                  class="absolute inset-y-0 end-0 text-gray-500 flex items-center px-3 cursor-pointer hover:text-gray-700  "
                  @click="params.search=null; getData() ">
                <XMarkIcon class="w-4 h-4  dark:text-gray-400"/>
              </div>
              <input type="text" id="table-search-users" v-model="params.search" @keydown.enter="getData()"
                     class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     :placeholder="__('search')">
            </div>
          </div>
          <!--           table-->
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <!--         table header-->
            <tr class="text-sm text-center">
              <th scope="col" class="p-4" @click="toggleAll">
                <div class="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" v-model="toggleSelect"
                         class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="checkbox-all-search" class="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col"
                  class="px-2 py-3   cursor-pointer duration-300 hover:text-gray-500 hover:scale-[105%]"
                  @click="params.order_by='title';params.dir=params.dir=='ASC'? 'DESC':'ASC'; params.page=1;getData()">
                <div class="flex items-center justify-center">
                  <span class="px-2">  {{ __('title') }}</span>
                  <ArrowsUpDownIcon class="w-4 h-4 "/>
                </div>
              </th>
              <th scope="col"
                  class="px-2 py-3   cursor-pointer duration-300 hover:text-gray-500 hover:scale-[105%]"
                  @click="params.order_by='article_id';params.dir=params.dir=='ASC'? 'DESC':'ASC'; params.page=1;getData()">
                <div class="flex items-center justify-center">
                  <span class="px-2">  {{ __('article') }}</span>
                  <ArrowsUpDownIcon class="w-4 h-4 "/>
                </div>
              </th>
              <th v-if="false" scope="col"
                  class="px-2 py-3   cursor-pointer duration-300 hover:text-gray-500 hover:scale-[105%]"
                  @click="params.order_by='view';params.dir=params.dir=='ASC'? 'DESC':'ASC'; params.page=1;getData()">
                <div class="flex items-center justify-center">
                  <span class="px-2">    {{ __('view') }} </span>
                  <ArrowsUpDownIcon class="w-4 h-4 "/>
                </div>
              </th>

              <th v-if="false && hasWallet()" scope="col"
                  class="px-2 py-3   cursor-pointer duration-300 hover:text-gray-500 hover:scale-[105%]"
                  @click="params.order_by='view_fee';params.dir=params.dir=='ASC'? 'DESC':'ASC'; params.page=1;getData()">
                <div class="flex items-center justify-center">
                  <Tooltip class="p-2 " :content="__('help_view_fee')">
                    <span class="px-2">    {{ __('view_fee') }} </span>
                  </Tooltip>
                  <ArrowsUpDownIcon class="w-4 h-4 "/>

                </div>
              </th>
              <th scope="col"
                  class="px-2 py-3   cursor-pointer duration-300 hover:text-gray-500 hover:scale-[105%]"
                  @click="params.order_by='status';params.dir=params.dir=='ASC'? 'DESC':'ASC'; params.page=1;getData()">
                <div class="flex items-center justify-center">
                  <span class="px-2">    {{ __('status') }} </span>
                  <ArrowsUpDownIcon class="w-4 h-4 "/>
                </div>
              </th>
              <th scope="col" v-if="false && hasWallet()"
                  class="px-2 py-3   cursor-pointer duration-300 hover:text-gray-500 hover:scale-[105%]"
                  @click="params.order_by='charge';params.dir=params.dir=='ASC'? 'DESC':'ASC'; params.page=1;getData()">
                <div class="flex items-center justify-center">
                  <span class="px-2">    {{ __('charge') }}  </span>
                  <ArrowsUpDownIcon class="w-4 h-4 "/>
                </div>
              </th>
              <th v-if="false" scope="col"
                  class="px-2 py-3   cursor-pointer duration-300 hover:text-gray-500 hover:scale-[105%]"
                  @click="params.order_by='meta';params.dir=params.dir=='ASC'? 'DESC':'ASC'; params.page=1;getData()">
                <div class="flex items-center justify-center">
                  <span class="px-2">    {{ __('meta_charge') }}  </span>
                  <ArrowsUpDownIcon class="w-4 h-4 "/>
                </div>
              </th>


              <th scope="col"
                  class="px-2 py-3   cursor-pointer duration-300 hover:text-gray-500 hover:scale-[105%]"
                  @click="params.order_by='category_id';params.dir=params.dir=='ASC'? 'DESC':'ASC'; params.page=1;getData()">
                <div class="flex items-center justify-center">
                  <span class="px-2">   {{ __('category') }}</span>
                  <ArrowsUpDownIcon class="w-4 h-4 "/>
                </div>
              </th>

              <th scope="col" class="px-2 py-3">
                {{ __('actions') }}
              </th>
            </tr>
            </thead>
            <tbody class=" ">
            <tr v-if="loading" v-for="i in 3"
                class="animate-pulse bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-search-1" type="checkbox"
                         class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">

                </div>
              </td>
              <td
                  class="flex  items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div class="w-10 h-10 rounded-full"
                />
                <div class="px-3">
                  <div class="text-base bg-gray-200 px-5 py-2 rounded-lg  "></div>
                  <div class="font-normal text-gray-500"></div>
                </div>
              </td>
              <td class="px-2 py-4 ">
                <div class="bg-gray-200 px-5 py-2 rounded-lg">

                </div>
              </td>
              <td class="px-2 py-4 ">
                <div class="bg-gray-200 px-5 py-2 rounded-lg">

                </div>
              </td>
              <td class="px-2 py-4 ">
                <div class="bg-gray-200 px-5 py-2 rounded-lg"></div>
              </td>
              <td class="px-2 py-4">
                <div
                    class="  justify-center bg-gray-200 px-5 py-3 rounded-lg  items-center text-center rounded-md "
                >

                </div>
              </td>
              <td class="px-2 py-4">
                <div class="bg-gray-200 px-5 py-2 rounded-lg"></div>
              </td>
              <td class="px-2 py-4">
                <!-- Actions Group -->
                <div
                    class="  bg-gray-200 px-5 py-4 rounded-lg rounded-md   "
                    role="group">

                </div>
              </td>
            </tr>
            <tr v-for="(d,idx) in data"
                class="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4" @click="d.selected=!d.selected">
                <div class="flex items-center">
                  <input id="checkbox-table-search-1" type="checkbox" v-model="d.selected"
                         class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">

                </div>
              </td>
              <td
                  class="flex  items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                <Link class="px-3 hover:text-gray-500" :href="route('panel.text.edit',d.id)">
                  <div class="text-base font-semibold">{{ cropText(d.title, 40) }}</div>
                  <div class="font-normal text-gray-500">{{ }}</div>
                </Link>
              </td>
              <td class="px-2 py-4">
                <Link v-if="d.article_id" :href="route('article', d.article_id)">{{ d.article_id }}</Link>
              </td>
              <td v-if="false" class="px-2 py-4">
                {{ d.view }}
              </td>


              <td v-if="false && hasWallet()"
                  class="px-2 py-4    " data-te-dropdown-ref>
                <button
                    id="dropdownViewFee"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="  min-w-[5rem] bg-gray-100 hover:bg-gray-200 px-1 cursor-pointer items-center text-center rounded-md py-[.2rem]"
                    :class="`bg-primary-100 hover:bg-primary-200 text-primary-500`"
                >
                  {{ asPrice(d.view_fee) }}
                </button>
                <ul ref="dropdownViewFeeMenu" data-te-dropdown-menu-ref
                    class="p-4  absolute z-[1000]    hidden   list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-center text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    tabindex="-1" role="menu" aria-orientation="vertical" aria-label="User menu"
                    aria-labelledby="dropdownViewFee">
                  <li v-if="d.status!='block'"
                      class="   text-sm  ">
                    <span class="text-xs py-2 text-danger-500">{{ __('help_view_fee') }}</span>
                    <div class="flex items-center ">
                      <input @keydown.enter="edit({'idx':idx,'id':d.id,'cmnd':'view-fee','view_fee':d.view_fee})"
                             type="number" min="0" class="grow my-2  p-1 rounded-lg border-gray-400"
                             v-model="d.view_fee">
                      <span class="text-xs ms-1 font-light text-gray-400">{{ __('currency') }}</span>
                    </div>
                  </li>

                  <li v-if="d.status!='block'">
                    <button class="bg-success-100 text-success-700 p-2 rounded-lg  hover:bg-success-50 w-full"
                            @click="edit({'idx':idx,'id':d.id,'cmnd':'view-fee','view_fee':d.view_fee})">
                      {{ __('reg') }}
                    </button>
                  </li>
                  <li v-if="  d.status=='block'  " role="menuitem"
                      class="   cursor-pointer   text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">
                    <div class="flex items-center  px-6 py-2 justify-between ">
                      <span>{{ __('not_available') }}</span>
                    </div>
                    <hr class="border-gray-200 dark:border-gray-700 ">
                  </li>

                </ul>
              </td>
              <td class="px-2 py-4    " data-te-dropdown-ref>
                <button
                    id="dropdownStatusSetting"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="  min-w-[5rem]  px-1 cursor-pointer items-center text-center rounded-md py-[.2rem]"
                    :class="`bg-${getStatus('text', d.status).color}-100 hover:bg-${getStatus('text', d.status).color}-200 text-${getStatus('text', d.status).color}-500`">
                  {{ getStatus('text', d.status).name }}
                </button>
                <ul ref="statusMenu" data-te-dropdown-menu-ref
                    class="  absolute z-[1000]   m-0 hidden   list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-center text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    tabindex="-1" role="menu" aria-orientation="vertical" aria-label="User menu"
                    aria-labelledby="dropdownStatusSetting">

                  <li v-if="d.status=='active'  " role="menuitem"
                      @click="edit({'idx':idx,'id':d.id,'cmnd':'inactive'})"
                      class="   cursor-pointer   text-sm   transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">
                    <div class="flex items-center text-danger  px-6 py-2 justify-between ">
                      <span class="bg-danger mx-1  animate-pulse px-1 py-1 rounded "></span>
                      {{ __('inactive') }}
                    </div>
                    <hr class="border-gray-200 dark:border-gray-700 ">
                  </li>
                  <li v-if="d.status=='review' || d.status=='block'  " role="menuitem"
                      class="   cursor-pointer   text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">
                    <div class="flex items-center  px-6 py-2 justify-between ">
                      <span v-if="d.status=='review'">{{ __('active_after_review') }}</span>
                      <span v-if="d.status=='block'">{{ __('not_available') }}</span>
                    </div>
                    <hr class="border-gray-200 dark:border-gray-700 ">
                  </li>
                  <li v-if="d.status=='inactive'  " role="menuitem"
                      @click="edit({'idx':idx,'id':d.id,'cmnd':'activate'})"
                      class="   cursor-pointer   text-sm text-primary-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">
                    <div class="flex items-center  px-6 py-2 justify-between ">
                      {{ __('activate') }}
                    </div>
                    <hr class="border-gray-200 dark:border-gray-700 ">
                  </li>
                </ul>
              </td>
              <td v-if="false && hasWallet()"
                  class="px-2 py-4    " data-te-dropdown-ref>
                <button
                    id="dropdownViewCharge"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="  min-w-[5rem]  bg-gray-100 hover:bg-gray-200  px-1 cursor-pointer items-center text-center rounded-md py-[.2rem]"
                    :class="`bg-${getStatus('podcast', d.status).color}-100 hover:bg-${getStatus('podcast', d.status).color}-200 text-${getStatus('podcast', d.status).color}-500`"
                >
                  {{ asPrice(d.charge) }}
                </button>
                <ul ref="dropdownViewChargeMenu" data-te-dropdown-menu-ref
                    class="  absolute z-[1000]   p-4  hidden   list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-center text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    tabindex="-1" role="menu" aria-orientation="vertical" aria-label="User menu"
                    aria-labelledby="dropdownViewCharge">
                  <li v-if="d.status!='block'"
                      class="     text-sm flex flex-col">
                    <span class="text-xs py-3 text-danger-500">{{ __('will_subtract_from_wallet') }}</span>
                    <div class="flex items-center">
                      <input @keydown.enter="edit({'idx':idx,'id':d.id,'cmnd':'charge','charge':d.charge})"
                             type="number" min="0" class="grow my-2  p-1 rounded-lg border-gray-400" v-model="d.charge">
                      <span class="text-xs ms-1 font-light text-gray-400">{{ __('currency') }}</span>
                    </div>
                  </li>

                  <li v-if="d.status!='block'">
                    <button class="bg-success-100 text-success-700 p-2 rounded-lg  hover:bg-success-50 w-full"
                            @click="edit({'idx':idx,'id':d.id,'cmnd':'charge','charge':d.charge})">
                      {{ __('charge') }}
                    </button>
                  </li>
                  <li v-if="  d.status=='block'  " role="menuitem"
                      class="   cursor-pointer   text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">
                    <div class="flex items-center  px-6 py-2 justify-between ">
                      <span>{{ __('not_available') }}</span>
                    </div>
                    <hr class="border-gray-200 dark:border-gray-700 ">
                  </li>

                </ul>
              </td>
              <td v-if="false"
                  class="px-2 py-4    " data-te-dropdown-ref>
                <button
                    id="dropdownViewCharge"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="  min-w-[5rem]  px-1 cursor-pointer items-center text-center rounded-md py-[.2rem]"
                >
                  {{ asPrice(d.meta) }}
                </button>
                <ul ref="dropdownViewChargeMenu" data-te-dropdown-menu-ref
                    class="  absolute z-[1000]   p-4  hidden   list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-center text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    tabindex="-1" role="menu" aria-orientation="vertical" aria-label="User menu"
                    aria-labelledby="dropdownViewCharge">
                  <li v-if="d.status!='block'"
                      class="     text-sm flex flex-col">
                    <span class="text-xs py-3 text-danger-500">{{ __('will_subtract_from_meta') }}</span>
                    <div class="flex items-center">
                      <input @keydown.enter="edit({'idx':idx,'id':d.id,'cmnd':'meta','meta':d.meta})"
                             type="number" min="0" class="grow my-2  p-1 rounded-lg border-gray-400" v-model="d.meta">

                    </div>
                  </li>

                  <li v-if="d.status!='block'">
                    <button class="bg-success-100 text-success-700 p-2 rounded-lg  hover:bg-success-50 w-full"
                            @click="edit({'idx':idx,'id':d.id,'cmnd':'meta','meta':d.meta})">
                      {{ __('charge') }}
                    </button>
                  </li>
                  <li v-if="  d.status=='block'  " role="menuitem"
                      class="   cursor-pointer   text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">
                    <div class="flex items-center  px-6 py-2 justify-between ">
                      <span>{{ __('not_available') }}</span>
                    </div>
                    <hr class="border-gray-200 dark:border-gray-700 ">
                  </li>

                </ul>
              </td>


              <td class="px-2 py-4 ">
                <div>
                  {{ getCategory(d.category_id) }}
                </div>
              </td>

              <td class="px-2 py-4">
                <!-- Actions Group -->
                <div
                    class=" inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    role="group">
                  <Link
                      type="button" :href="route('panel.text.edit',d.id)"
                      class="inline-block rounded  bg-orange-500 text-white px-6  py-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-orange-400   focus:outline-none focus:ring-0  "
                      data-te-ripple-init
                      data-te-ripple-color="light">
                    {{ __('edit') }}
                  </Link>

                  <!--                  <button -->
                  <!--                      type="button"-->
                  <!--                      class="inline-block rounded-e bg-teal-500 px-6 py-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-teal-400   focus:outline-none focus:ring-0  "-->
                  <!--                      data-te-ripple-init-->
                  <!--                      data-te-ripple-color="light">-->
                  <!--                    {{ __('charge') }}-->
                  <!--                  </button>-->
                </div>
              </td>
            </tr>

            </tbody>
          </table>

        </div>

      </div>
    </template>


  </Panel>
</template>

<script>
import Scaffold from "@/Layouts/Scaffold.vue";
import Panel from "@/Layouts/Panel.vue";
import {Head, Link, useForm} from "@inertiajs/vue3";
import Pagination from "@/Components/Pagination.vue";
import {
  Bars2Icon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  HomeIcon,
  XMarkIcon,
  ArrowsUpDownIcon,

} from "@heroicons/vue/24/outline";
import Image from "@/Components/Image.vue"
import Tooltip from "@/Components/Tooltip.vue";

export default {
  data() {
    return {
      params: {
        page: 1,
        search: null,
        paginate: this.$page.props.pageItems[0],
        order_by: null,
        dir: 'DESC',
      },
      data: [],
      pagination: {},
      toggleSelect: false,
      loading: false,
      error: null,
    }
  },
  components: {
    Head,
    Link,
    HomeIcon,
    ChevronDownIcon,
    Panel,
    Bars2Icon,
    Image,
    MagnifyingGlassIcon,
    XMarkIcon,
    Pagination,
    ArrowsUpDownIcon,
    Tooltip,
  },
  mounted() {

    this.getData();

    // this.showDialog('danger', 'message',()=>{});
    // this.isLoading(false);
  },
  methods: {
    getData() {

      this.loading = true;
      this.data = [];
      window.axios.get(route('panel.text.search'), {
        params: this.params
      }, {
        onUploadProgress: function (axiosProgressEvent) {
          console.log(axiosProgressEvent);
          /*{
            loaded: number;
            total?: number;
            progress?: number; // in range [0..1]
            bytes: number; // how many bytes have been transferred since the last trigger (delta)
            estimated?: number; // estimated time in seconds
            rate?: number; // upload speed in bytes
            upload: true; // upload sign
          }*/
        },

        onDownloadProgress: function (axiosProgressEvent) {
          console.log(axiosProgressEvent);

          /*{
            loaded: number;
            total?: number;
            progress?: number;
            bytes: number;
            estimated?: number;
            rate?: number; // download speed in bytes
            download: true; // download sign
          }*/
        }
      })
          .then((response) => {
            this.data = response.data.data;
            this.data.forEach(el => {
              el.selected = false;
            });
            delete response.data.data;
            this.pagination = response.data;

          })

          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              this.error = error.response.data;

            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
              this.error = error.request;
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              this.error = error.message;
            }
            console.log(error.config);
            this.showToast('danger', error)
          })
          .finally(() => {
            // always executed
            this.loading = false;
          });
    },
    toggleAll() {

      this.toggleSelect = !this.toggleSelect;
      this.data.forEach(e => {
        e.selected = this.toggleSelect;
      });
    },
    edit(params) {
      this.isLoading(true);
      window.axios.patch(route('text.update'), params,
          {
            onUploadProgress: function (axiosProgressEvent) {
              // console.log(axiosProgressEvent);
              /*{
                loaded: number;
                total?: number;
                progress?: number; // in range [0..1]
                bytes: number; // how many bytes have been transferred since the last trigger (delta)
                estimated?: number; // estimated time in seconds
                rate?: number; // upload speed in bytes
                upload: true; // upload sign
              }*/
            },

            onDownloadProgress: function (axiosProgressEvent) {
              // console.log(axiosProgressEvent);

              /*{
                loaded: number;
                total?: number;
                progress?: number;
                bytes: number;
                estimated?: number;
                rate?: number; // download speed in bytes
                download: true; // download sign
              }*/
            }
          })
          .then((response) => {
            if (response.data && response.data.message) {
              this.showToast('success', response.data.message);

            }
            if (response.data.charge) {
              this.data[params.idx].charge = response.data.charge;
              this.user.wallet = response.data.wallet;
            }
            if (response.data.status) {
              this.data[params.idx].status = response.data.status;
            }
            if (response.data.view_fee) {
              this.data[params.idx].view_fee = response.data.view_fee;
            }
            if (response.data.meta) {
              this.data[params.idx].meta = response.data.meta;
              this.user.meta_wallet = response.data.meta_wallet;
            }

          })

          .catch((error) => {
            this.error = this.getErrors(error);
            if (error.response && error.response.data) {
              if (error.response.data.charge) {
                this.data[params.idx].charge = error.response.data.charge;
              }
              if (error.response.data.view_fee) {
                this.data[params.idx].view_fee = error.response.data.view_fee;
              }
              if (error.response.data.meta) {
                this.data[params.idx].meta = error.response.data.meta;
              }
            }
            this.showToast('danger', this.error);
          })
          .finally(() => {
            // always executed
            this.isLoading(false);
          });
    },
    paginationChanged(data) {

      this.params.page = data.page;
      this.getData();
    },
    bulkAction(cmnd) {
      if (this.data.filter(e => e.selected).length == 0) {
        this.showToast('danger', this.__('nothing_selected'));
        return;
      }
      this.isLoading(true);
      const params = {
        cmnd: cmnd, data: this.data.reduce((result, el) => {
          if (el.selected) result.push(el.id);
          return result;
        }, [])
      };

      window.axios.patch(route('text.update'), params,
          {
            onUploadProgress: function (axiosProgressEvent) {
            },

            onDownloadProgress: function (axiosProgressEvent) {
            }
          })
          .then((response) => {
            if (response.data && response.data.message) {
              this.showToast('success', response.data.message);

            }
            if (response.data && response.data.results) {
              const res = response.data.results;
              for (let i in this.data)
                for (let j in res)
                  if (res[j].id == this.data[i].id) {
                    this.data[i].status = res[j].status;
                    break;
                  }
            }

          })

          .catch((error) => {
            this.error = this.getErrors(error);

            this.showToast('danger', this.error);
          })
          .finally(() => {
            this.isLoading(false);
          });
    }
  },

}
</script>
