<template>

  <Panel>
    <template v-slot:header>
      <title>{{__('panel')}}</title>
    </template>


    <template #content>
      <!-- Content header -->
      <div
          class="flex items-center justify-between px-4 py-2 border-b lg:py-4 dark:border-primary-darker">
        <h1 class="text-2xl font-semibold">{{ __('statistics') }}</h1>

      </div>

      <!-- Content -->
      <div class="mt-2">
        <!-- State cards -->
        <div class="grid   gap-2 p-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3  ">

          <div class="grid grid-cols-1 md:grid-cols-2 lg:col-span-2 gap-2">
            <!-- user card -->
            <div :class="cardShadow"
                 class="flex   items-center justify-between p-4 bg-white  rounded-lg dark:bg-darker ">
              <div>
                <div class="flex text-sm text-gray-500">
                  <div>{{ __('id') }}:</div>
                  <div class="mx-1 font-semibold">{{ $page.props.auth.user.id }}</div>
                </div>
                <div class="flex text-sm text-primary-500">
                  <div>{{ __('name') }}:</div>
                  <div class="mx-1 font-semibold">{{ $page.props.auth.user.fullname }}</div>
                </div>

              </div>

              <div>
                <UserIcon class="w-12 h-12 text-primary-300 dark:text-pink-50 "/>
              </div>

            </div>

            <!-- wallet card -->
            <div :class="cardShadow"
                 class="flex   items-center justify-between p-4 bg-white  rounded-lg dark:bg-darker ">
              <div>
                <h6 class="text-xs font-bold   py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light">
                  {{ __('wallet') }}
                </h6>
                <span class="text-xl font-semibold"> {{ asPrice(user.wallet) }} {{ __('currency') }}</span>

              </div>

              <div>
                <CurrencyDollarIcon class="w-12 h-12 text-primary-300 dark:text-pink-50 "/>
              </div>

            </div>
          </div>
          <!-- ticket card -->
          <Link :href="route('panel.ticket.index')" :class="cardShadow"
                class="flex hover:scale-[101%] transition duration-300 cursor-pointer   items-center justify-around   p-4 bg-white  rounded-lg dark:bg-darker">
            <div class="flex flex-col grow">
              <h6 class="text-xs font-bold   py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light">
                {{ __('tickets') }}
              </h6>

              <div class="justify-around flex  ">
                                <span v-for="(t,idx) in tickets" class="align-middle flex  flex-col text-center  ">
                                        <span
                                            :class="idx==0?'text-red-500':idx==1?'text-primary-500':'text-green-500'"
                                            class="  text-xl font-semibold "> {{ t.value }}</span>
                                        <span
                                            :class="idx==0?'bg-red-100 text-red-500':idx==1?'bg-primary-100 text-primary-500':'bg-green-100 text-green-500'"
                                            class="   mx-1 px-2 py-1    text-xs  rounded-md">
                                   {{ __(t.title) }}
                                        </span>
                                </span>
              </div>

            </div>
            <div class="flex">
              <TicketIcon class="w-12 h-12 text-primary-300 dark:text-pink-50 "/>
            </div>

          </Link>
          <!-- items card -->
          <div :class="cardShadow"
               class="flex   cursor-pointer   items-center justify-around   bg-white  rounded-lg dark:bg-darker">
            <div class="flex flex-col grow">
              <h6 class="text-xs font-bold   p-4 tracking-wider text-gray-500 uppercase dark:text-primary-light">
                {{ __('items') }}
              </h6>

              <div class="    flex items-stretch  ">
                <Link v-for="(i,idx) in items" :href="route(`panel.${i.type}.index`)"
                      class="  flex flex-col  pb-6 xl:pt-6 xl:pb-2 items-around justify-around hover:scale-[102%]     px-1  grow text-center hover:bg-gray-100  ">
                                        <span
                                            :class="idx==0?'text-pink-500':idx==1?'text-teal-500':idx==2?'text-fuchsia-500':'text-amber-500'"
                                            class="  text-xl font-semibold "> {{ i.count }}</span>
                  <span
                      :class="idx==0?'bg-pink-100 text-pink-500':idx==1?'bg-teal-100 text-teal-500':idx==2?'bg-fuchsia-100 text-fuchsia-500':'bg-amber-100 text-amber-500'"
                      class="   mx-1 px-2 py-1    text-xs  rounded-md">
                                   {{ __(i.type) }}
                                        </span>
                </Link>
              </div>

            </div>


          </div>
          <!-- available projects card -->
          <Link :href="route('panel.project_item.available'  )" :class="cardShadow"
                class="flex lg:col-span-1 hover:scale-[101%] transition duration-300 cursor-pointer   items-center justify-around   p-4 bg-success-50  rounded-lg dark:bg-darker">
            <div class="flex flex-col grow">
              <h6 class="text-xs font-bold   py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light">
                {{ __('available_projects') }}
              </h6>

              <div class="justify-around flex  ">
                  <span v-for="(p,idx) in availableOrders" class="align-middle flex  flex-col text-center  ">
                          <span
                              :class="`text-${p.color}-500`"
                              class="  text-xl font-semibold "> {{ p.value }}</span>
                          <span
                              :class="`text-${p.color}-500 bg-${p.color}-100` "
                              class="   mx-1 px-2 py-1    text-xs  rounded-md">
                     {{ __(p.title) }}
                          </span>
                  </span>
              </div>

            </div>
            <div class="flex">
              <BellAlertIcon class="w-12 h-12 text-green-300 dark:text-pink-50 "/>
            </div>
          </Link>

          <div class="grid lg:col-span-2  gap-2 grid-cols-1 lg:grid-cols-2 ">
            <!-- my orders card -->
            <Link :href="route('panel.project.index')" :class="cardShadow"
                  class="flex lg:col-span-1 hover:scale-[101%] transition duration-300 cursor-pointer   items-center justify-around   p-4 bg-white  rounded-lg dark:bg-darker">
              <div class="flex flex-col grow">
                <h6 class="text-xs font-bold   py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light">
                  {{ __('your_orders') }}
                </h6>

                <div class="justify-around flex  ">
                  <span v-for="(p,idx) in myOrders" class="align-middle flex  flex-col text-center  ">
                          <span
                              :class="`text-${p.color}-500`"
                              class="  text-xl font-semibold "> {{ p.value }}</span>
                          <span
                              :class="`text-${p.color}-500 bg-${p.color}-100` "
                              class="   mx-1 px-2 py-1    text-xs  rounded-md">
                     {{ __(p.title) }}
                          </span>
                  </span>
                </div>

              </div>
              <div class="flex">
                <ShoppingBagIcon class="w-12 h-12 text-primary-300 dark:text-pink-50 "/>
              </div>
            </Link>


            <!-- working projects card -->
            <Link :href="route('panel.project.index')" :class="cardShadow"
                  class="flex lg:col-span-1 hover:scale-[101%] transition duration-300 cursor-pointer   items-center justify-around   p-4 bg-white  rounded-lg dark:bg-darker">
              <div class="flex flex-col grow">
                <h6 class="text-xs font-bold   py-2 tracking-wider text-gray-500 uppercase dark:text-primary-light">
                  {{ __('working_projects') }}
                </h6>

                <div class="justify-around flex  ">
                  <span v-for="(p,idx) in myWorkingProjects" class="align-middle flex  flex-col text-center  ">
                          <span
                              :class="`text-${p.color}-500`"
                              class="  text-xl font-semibold "> {{ p.value }}</span>
                          <span
                              :class="`text-${p.color}-500 bg-${p.color}-100` "
                              class="   mx-1 px-2 py-1    text-xs  rounded-md">
                     {{ __(p.title) }}
                          </span>
                  </span>
                </div>

              </div>
              <div class="flex">
                <BriefcaseIcon class="w-12 h-12 text-primary-300 dark:text-pink-50 "/>
              </div>
            </Link>

          </div>
        </div>


        <!-- Charts -->
        <div class="grid-cols-1  px-4 space-y-2 gap-2     xl:grid-cols-2">
          <!-- Bar chart card -->
          <div v-if="  $page.props.hasAdvertise" class="  bg-white rounded-md dark:bg-darker"
               x-data="{ isOn: false }">
            <!-- Card header -->
            <div class="flex items-center justify-between p-4 border-b dark:border-primary">
              <h4 class="text-lg font-semibold text-gray-500 dark:text-light"> {{ __('advertises_statistics') }}</h4>
              <div v-if="false" class="flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-light"> </span>
                <button class="relative focus:outline-none"
                        @click="isOn = !isOn;  ">
                  <div
                      class="w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"></div>
                  <div
                      class="absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm translate-x-0 bg-white dark:bg-primary-100"
                      :class="{ 'translate-x-0  bg-white dark:bg-primary-100': !isOn, 'translate-x-6 bg-primary-light dark:bg-primary': isOn }"></div>
                </button>
              </div>
            </div>
            <!-- Chart -->
            <div class="relative px-4 ">
              <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                  <div class=""></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                  <div class=""></div>
                </div>
              </div>
              <Chart key="advertises" id="advertises" :units="[__('view'),__('currency'),__('meta')]"
                     :log-link="route('transaction.chart')"
                     :parent-params="{user_id:user.id,type:'data'}"
              />
            </div>
          </div>
          <!-- Bar chart card -->
          <div class=" bg-white rounded-md dark:bg-darker"
               x-data="{ isOn: false }">
            <!-- Card header -->
            <div class="flex items-center justify-between p-4 border-b dark:border-primary">
              <h4 class="text-lg font-semibold text-gray-500 dark:text-light"> {{ __('transaction_statistics') }}</h4>
              <div v-if="false" class="flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-light"> </span>
                <button class="relative focus:outline-none"
                        @click="isOn = !isOn;  ">
                  <div
                      class="w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"></div>
                  <div
                      class="absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm translate-x-0 bg-white dark:bg-primary-100"
                      :class="{ 'translate-x-0  bg-white dark:bg-primary-100': !isOn, 'translate-x-6 bg-primary-light dark:bg-primary': isOn }"></div>
                </button>
              </div>
            </div>
            <!-- Chart -->
            <div class="relative px-4 ">
              <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                  <div class=""></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                  <div class=""></div>
                </div>
              </div>
              <Chart key="transactions" id="transactions" :units="[__('view'),__('currency'),__('meta')]"
                     :log-link="route('transaction.chart')"
                     :parent-params="{user_id:user.id,type:'user'}"
              />
            </div>
          </div>

        </div>

      </div>
    </template>


  </Panel>
</template>

<script>
import Panel from "@/Layouts/Panel.vue";

import {Head, Link} from "@inertiajs/vue3";
import {loadScript} from "vue-plugin-load-script";

import {
  HomeIcon,
  ChevronDownIcon,
  Bars3Icon,
  PlusSmallIcon,
  Bars2Icon,
  NewspaperIcon,
  WindowIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  PhotoIcon,
  FilmIcon,
  MicrophoneIcon,
  MegaphoneIcon,
  LightBulbIcon,
  CurrencyDollarIcon,
  BellAlertIcon,
  Cog6ToothIcon,
  TicketIcon,
  BriefcaseIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/24/outline";
import {inject, watchEffect} from "vue";
import Chart from "@/Components/Chart.vue";

export default {
  setup(props) {
    // const weatherData = inject('showToast')
    watchEffect(() => {
      // console.log('new weatherData', weatherData.value)
    })
  },
  data() {
    return {
      open: false,
      isDark: false,
      loading: false,
      isMobileMainMenuOpen: false,
      isMobileSubMenuOpen: false,
      isOn: false,
      user: this.$page.props.auth.user,
      tickets: this.$page.props.tickets,
      availableOrders: this.$page.props.availableOrders,
      myOrders: this.$page.props.myOrders,
      myWorkingProjects: this.$page.props.myWorkingProjects,
      items: this.$page.props.items,
      cardShadow: 'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]',
    }
  },
  // emits: ['showToast'],
  components: {
    Chart,
    Panel,
    CurrencyDollarIcon,
    TicketIcon,
    Head,
    Link,
    BriefcaseIcon,
    UserIcon,
    ShoppingBagIcon,
    BellAlertIcon
  },
  mounted() {
    // console.log(this.$emit('showToast'))

    // this.showToast('warning', 'hii');


  },
  methods: {},

}
</script>

