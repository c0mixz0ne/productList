<script setup lang="ts">
    import type { IDevice, INode } from '@/types/types';
    defineProps<{
        device: IDevice,
        editable: boolean
    }>()
</script>
<template>
    <div contenteditable="false" class="device">
        <span>{{ device.id }}</span>
        <span>{{ device.name }}</span>
        <ol>
            <li v-for="node of device.nodes" :key="node.id">
                {{ node.id }},{{ node.id }}
            </li>
        </ol>
    </div>
    <button v-if="editable">Удалить узел</button>
    <button v-if="editable">Добавить узел</button>
</template>