<script setup lang="ts">
import type { IDevice, INode } from '@/types/types'
import draggable from 'vuedraggable'

defineProps<{
  devices: IDevice[]
  editable: boolean
}>()

const emits = defineEmits<{
  (e: 'addNewNode', indexDevice: number): void
  (e: 'deleteNode', indexDevice: number, indexNode: number): void
  (e: 'deleteDevice', indexDevice: number): void
}>()

const deleteNode = (indexDevice: number, indexNode: number) => {
  emits('deleteNode', indexDevice, indexNode)
}

const addNewNode = (indexDevice: number) => {
  emits('addNewNode', indexDevice)
}

const deleteDevice = (indexDevice: number) => {
  emits('deleteDevice', indexDevice)
}
</script>
<template>
  <draggable
    ghost-class="ghost-device"
    class="device-list"
    :class="editable ? 'editable' : ''"
    id="devices"
    group="devices"
    :list="devices"
    :disabled="!editable"
    item-key="index"
    tag="ul"
  >
    <template #item="{ element: device, index: indexDevice }">
      <li :class="editable ? 'move' : ''" class="device">
        <input
          :id="String(indexDevice)"
          :disabled="!editable"
          type="text"
          v-model="device.name"
        />
        <ul v-if="device.nodes.length || editable" class="node-list">
          <draggable
            ghost-class="ghost-node"
            class="nodes"
            id="nodes"
            group="nodes"
            :list="device.nodes"
            :disabled="!editable"
            item-key="index"
            tag="ul"
          >
            <template #item="{ element: node, index: indexNode }">
              <li class="node">
                <input
                  :id="String(indexNode)"
                  :disabled="!editable"
                  type="text"
                  v-model="node.name"
                />
                <button
                  v-if="editable"
                  @click="deleteNode(indexDevice, indexNode)"
                >
                  Удалить узел
                </button>
              </li>
            </template>
          </draggable>
          <li>
            <button
              class="add-node"
              v-if="editable"
              @click="addNewNode(indexDevice)"
            >
              Добавить узел
            </button>
          </li>
        </ul>
        <button v-if="editable" @click="deleteDevice(indexDevice)">
          Удалить устройство
        </button>
      </li>
    </template>
  </draggable>
</template>
<style scoped>
.ghost-device {
  opacity: 0.9;
  background: #c8ebfb;
}
.ghost-node {
  opacity: 0.9;
  background: #dc0e3e;
}
</style>
