<script setup>
    import {ref, onMounted, onUnmounted, watchEffect} from 'vue';
    import moment from 'moment';
    import { usePage } from '@inertiajs/vue3';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    import useCompanies from '@/Composables/userSettings'

    const { errors, userSetting, getUserSettings, storeUserSettings } = useCompanies();

    const time = ref(moment());
    const interval = ref(null);

    onMounted(async () => {
        console.log('mounted');

        interval.value = setInterval(() => {
            //time.value = moment();
            time.value = moment().add(userSetting.value.clock_offset, 'seconds');
        }, 1000);

        await getUserSettings();

        if (errors.value.length > 0) {
            notify(errors.value, 'error');
        } else {
            notify('Settings loaded!');
        }
    });

    onUnmounted(() => {
        console.log('unmounted');
        clearInterval(interval.value);
    });

    const hours = () => {
        return time.value.format('HH');
    };
    const minutes = () => {
        return time.value.format('mm');
    };
    const seconds = () => {
        return time.value.format('ss');
    };

    const offsetFormatted = () => {
        let seconds = userSetting.value.clock_offset;
        const hours = Math.floor(Math.abs(seconds) / 3600);
        seconds %= 3600;
        const minutes = Math.floor(Math.abs(seconds) / 60);
        seconds %= 60;
        seconds = Math.abs(seconds);

        const formatted =  [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");

        return userSetting.value.clock_offset < 0 ? "-" + formatted : formatted;
    }

    const saveUserSetting = async (val=null) => {
        console.log('save');
        await storeUserSettings({
            //user_id: usePage().props.auth.user.id,
            clock_offset: val === null ? userSetting.value.clock_offset : val
        });

        if (errors.value.length > 0) {
            notify(errors.value, 'error');
        } else {
            notify('Settings saved!');
        }
    }

    const adjustOffset = (seconds) => {
        console.log('adjust');

        userSetting.value.clock_offset += seconds;

        //await storeUserSettings({
        //    //user_id: usePage().props.auth.user.id,
        //    clock_offset: '60'
        //});
    }

    const notify = (message, type = 'info') => {
        toast(message, {
            autoClose: 1000,
            theme: 'dark',
            type: type,
        });
    }

</script>

<template>
    <div class="flex justify-center items-center bg-gradient-to-br from-teal-600 to-teal-900 p-2">
        <h1 class="text-2xl text-white">Current Time Offset: {{ offsetFormatted() }}</h1>
        <button id="reset" class="m-2 bg-gray-800 hover:bg-red-400 text-white font-bold py-1 px-2 rounded" @click="saveUserSetting(0)">
            Clear Offset
        </button>
    </div>

    <div class="flex justify-center items-center bg-gradient-to-br from-teal-400 to-teal-800 p-20">
        <!-- flip clock container -->
        <div class="relative border-8 border-teal-900 rounded shadow-2xl font-mono text-9xl text-white grid grid-cols-3 gap-x-px">

            <!-- hours -->
            <div class="relative bg-black p-8">
                <!-- background grid of black squares -->
                <div class="absolute inset-0 grid grid-rows-2">
                    <div class="bg-gradient-to-b from-gray-600 to-white"></div>
                    <div class="bg-gradient-to-t from-gray-600 to-white"></div>
                </div>

                <!-- time numbers -->
                <span class="relative text-black">{{ hours() }}</span>

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                    <div class="h-px w-full bg-black"></div>
                </div>

                <!-- buttons to adjust offset -->
                <div class="absolute inset-0 flex items-end">
                    <button id="plus-hours" class="bg-black w-1/2 text-base hover:bg-gray-800 mr-0.5" @click="adjustOffset(60*60)">+</button>
                    <button id="minus-hours" class="bg-black w-1/2 text-base hover:bg-gray-800 ml-0.5" @click="adjustOffset(-60*60)">-</button>
                </div>
            </div>

            <!-- minutes -->
            <div class="relative bg-black p-8">
                <!-- background grid of black squares -->
                <div class="absolute inset-0 grid grid-rows-2">
                    <div class="bg-gradient-to-b from-gray-600 to-white"></div>
                    <div class="bg-gradient-to-t from-gray-600 to-white"></div>
                </div>

                <span class="relative text-black">{{ minutes() }}</span>

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                    <div class="h-px w-full bg-black"></div>
                </div>

                <!-- buttons to adjust offset -->
                <div class="absolute inset-0 flex items-end">
                    <button id="plus-minutes" class="bg-black w-1/2 text-base hover:bg-gray-800 mr-0.5" @click="adjustOffset(60)">+</button>
                    <button id="minus-minutes" class="bg-black w-1/2 text-base hover:bg-gray-800 ml-0.5" @click="adjustOffset(-60)">-</button>
                </div>
            </div>

            <!-- seconds -->
            <div class="relative bg-black p-8">
                <!-- background grid of black squares -->
                <div class="absolute inset-0 grid grid-rows-2">
                    <div class="bg-gradient-to-b from-gray-600 to-white"></div>
                    <div class="bg-gradient-to-t from-gray-600 to-white"></div>
                </div>

                <span class="relative text-black">{{ seconds() }}</span>

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                    <div class="h-px w-full bg-black"></div>
                </div>

                <!-- buttons to adjust offset -->
                <div class="absolute inset-0 flex items-end">
                    <button id="plus-seconds" class="bg-black w-1/2 text-base hover:bg-gray-800 mr-0.5" @click="adjustOffset(1)">+</button>
                    <button id="minus-seconds" class="bg-black w-1/2 text-base hover:bg-gray-800 ml-0.5" @click="adjustOffset(-1)">-</button>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>

</style>
