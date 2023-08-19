<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import moment from 'moment';

    const time = ref(moment());
    const interval = ref(null);

    onMounted(() => {
        console.log('mounted');
        interval.value = setInterval(() => {
            time.value = moment();
        }, 1000);
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

</script>

<template>

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
