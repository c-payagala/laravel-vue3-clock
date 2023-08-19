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
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    }

    const saveUserSetting = async () => {
        console.log('save');
        await storeUserSettings({
            //user_id: usePage().props.auth.user.id,
            clock_offset: '60'
        });

        if (errors.value.length > 0) {
            notify(errors.value, 'error');
        } else {
            notify('Settings saved!');
        }
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
    <div class="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-indigo-900 p-2">
        {{ userSetting?.clock_offset !== undefined ? userSetting?.clock_offset : 'Error loading settings' }}
         - {{ offsetFormatted() }} -
        <button class="button" @click="saveUserSetting">Save</button>
    </div>

    <div class="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-indigo-900 p-20">
        <!-- flip clock container -->
        <div class="relative border-8 border-yellow-100 rounded shadow-2xl font-mono text-9xl text-white grid grid-cols-3 gap-x-px">

            <!-- hours -->
            <div class="relative bg-black p-8">
                <!-- background grid of black squares -->
                <div class="absolute inset-0 grid grid-rows-2">
                    <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                    <div class="bg-gradient-to-br from-gray-700 to-black"></div>
                </div>

                <!-- time numbers -->
                <span class="relative">{{ hours() }}</span>

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                    <div class="h-px w-full bg-black"></div>
                </div>
            </div>

            <!-- minutes -->
            <div class="relative bg-black p-8">
                <!-- background grid of black squares -->
                <div class="absolute inset-0 grid grid-rows-2">
                    <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                    <div class="bg-gradient-to-br from-gray-700 to-black"></div>
                </div>

                <span class="relative">{{ minutes() }}</span>

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                    <div class="h-px w-full bg-black"></div>
                </div>
            </div>

            <!-- seconds -->
            <div class="relative bg-black p-8">
                <!-- background grid of black squares -->
                <div class="absolute inset-0 grid grid-rows-2">
                    <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                    <div class="bg-gradient-to-br from-gray-700 to-black"></div>
                </div>

                <span class="relative">{{ seconds() }}</span>

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                    <div class="h-px w-full bg-black"></div>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>

</style>
