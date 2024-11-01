<script setup lang="ts">
import { ref } from 'vue'
import DeviceItem from './DeviceItem.vue'

import data from '../../public/data/data.json'
import type { IDevice } from '@/types/types'

const devices = ref(data.devices as IDevice[])

const editable = ref(false)

const edit = () => {
  editable.value = !editable.value
}

const addNewDevice = () => {
  const newDevice: IDevice = {
    name: `Новое устройство`,
    nodes: [],
  }

  devices.value.push(newDevice)
}

const deleteDevice = (device: number) => {
  devices.value.splice(device, 1)
}

const addNewNode = (device: number) => {
  const newNode = {
    name: `Новый узел`,
  }

  devices.value[device].nodes.push(newNode)
}

const deleteNode = (device: number, node: number) => {
  devices.value[device].nodes.splice(node, 1)
}
</script>

<template>
  <div class="container">
    <h1>Список Устройств</h1>
    <DeviceItem
      :devices="devices"
      :editable="editable"
      @deleteNode="deleteNode"
      @addNewNode="addNewNode"
      @deleteDevice="deleteDevice"
    ></DeviceItem>
    <button v-if="!editable" @click="edit">Редактировать</button>
    <button v-if="editable" @click="addNewDevice">Добавить устройство</button
    ><button v-if="editable" @click="edit">Сохранить</button>
  </div>
</template>
