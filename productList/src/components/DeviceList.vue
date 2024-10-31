<script setup lang="ts">
import { ref } from 'vue'
import DeviceItem from './DeviceItem.vue'

import data from '../../public/data/data.json'
import type { IDevice, INode } from '@/types/types'

const devices = ref(data.devices as IDevice[])

const editable = ref(false)
const modalVisability = ref(false)

const edit = (e: any) => {
  editable.value = !editable.value
  console.log(devices)
}

const addNewDevice = () => {

  const deviceId = devices.value.length

  const newDevice: IDevice = {
    id: deviceId,
    name: 'Новое устройство',
    nodes: []
  }  

  devices.value.push(newDevice)
}

const deleteDevice = (deviceId: number) => {
  devices.value.splice(deviceId, 1)
}

const addNewNode = (deviceId: number) => {
  const newNode = {
    id: devices.value[deviceId].nodes.length,
    name: "Новый узел"
  }

  devices.value[deviceId].nodes.push(newNode)
}

const deleteNode = (productId: number, nodeId: number) => {
  console.log(productId, nodeId);
  devices.value[productId].nodes.splice(nodeId, 1)
}

const save = (e: any) => {
  editable.value = !editable.value
  console.log(devices.value);
  
  if (devices) {
    console.log('update')
  } else {
    console.log('create new')
  }
}
</script>

<template>
  <div class="container">
    <h1>Список Устройств</h1>
    <ul class="device-list" :class="editable ? 'editable' : ''">
      <li class="device" v-for="device of devices" :key="device.id">
        <input :disabled="!editable" type="text" v-model="device.name" />
        <ul v-if="device.nodes.length" class="node-list">
          <li class="node" v-for="node of device.nodes" :key="device.id">
            <input :disabled="!editable" type="text" v-model="node.name" />
            <button v-if="editable" @click="deleteNode(device.id, node.id)">Удалить узел</button>
          </li>
        </ul>
        <button v-if="editable" @click="deleteDevice(device.id)">
          Удалить устройство
        </button>
        <button v-if="editable" @click="addNewNode(device.id)">
          Добавить узел
        </button>
      </li>
    </ul>
    <button v-if="!editable" @click="edit">Редактировать</button>
    <button v-if="editable" @click="addNewDevice">Добавить устройство</button
    ><button v-if="editable" @click="save">Сохранить</button>
  </div>
</template>
