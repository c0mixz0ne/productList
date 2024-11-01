<script setup lang="ts">
import { ref } from 'vue'

import data from '../../public/data/data.json'
import type { IDevice, INode } from '@/types/types'

const devices = ref(data.devices as IDevice[])

const editable = ref(false)

const edit = () => {
  editable.value = !editable.value  
}

const addNewDevice = () => {
  const newDevice: IDevice = {
    name: `Новое устройство`,
    nodes: []
  }

  devices.value.push(newDevice)
}

const deleteDevice = (device: number) => {
  devices.value.splice(device, 1)
}

const addNewNode = (device: number) => {
  const newNode = {
    name: `Новый узел`
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
    <ul class="device-list" :class="editable ? 'editable' : ''">
      <li class="device" v-for="(device, indexDevice) of devices" :key="indexDevice">
        <input :id="String(indexDevice)" :disabled="!editable" type="text" v-model="device.name" />
        <ul v-if="device.nodes.length || editable" class="node-list">
          <li class="node" v-for="(node, indexNode) of device.nodes" :key="indexNode">
            <input :id="String(indexNode)" :disabled="!editable" type="text" v-model="node.name" />
            <button v-if="editable" @click="deleteNode(indexDevice, indexNode)">Удалить узел</button>
          </li>
          <li>
            <button class="add-node" v-if="editable" @click="addNewNode(indexDevice)">
            Добавить узел
          </button>
          </li>
        </ul>
        <button v-if="editable" @click="deleteDevice(indexDevice)">
          Удалить устройство
        </button>
      </li>
    </ul>
    <button v-if="!editable" @click="edit">Редактировать</button>
    <button v-if="editable" @click="addNewDevice">Добавить устройство</button
    ><button v-if="editable" @click="edit">Сохранить</button>
  </div>
</template>
