<template>
    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card max-width="500" :text="text" :title="title">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="好的" @click="dialog = false;"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        }
    }, props: {
        text: "",
        title: ""
    }, methods: {
        show() {
            this.dialog = true;
        }
    }
}
</script>