<template>
    <Header />
    <main class="py-6 bg-surface-secondary">
        <div class="container-fluid vstack gap-6">
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
import Header from '../components/Header/Header.vue'
export default{
    components: {
        Header,
    },
}

</script>