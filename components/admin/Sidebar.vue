<template lang="pug">
  .sidebar
    el-menu.el-menu-vertical-demo(:default-active="$route.fullPath" router :unique-opened="true")
      el-menu-item(index="/")
        template(slot="title")
          i.el-icon-school
          span Home
      el-submenu(index="4")
        template(slot="title")
          i.el-icon-location
          span Pages
        el-menu-item(index="/admin/page/new-page")
          span New page
        el-menu-item(index="/admin/page")
          span List
      el-submenu(index="2")
        template(slot="title")
          i.el-icon-location
          span Tipo
        el-menu-item(index="/admin/tipo/new")
          span Tipo new
        el-menu-item(index="/admin/tipo")
          span Tipo list
      el-submenu(index="1")
        template(slot="title")
          i.el-icon-location
          span Solutions
        el-menu-item(index="/admin/solutions/create")
          span Add new
        el-menu-item(index="/admin/solutions")
          span List
</template>

<style lang="scss">
@import "assets/scss/partials/variables";
.el-menu {
  background-color: #545c64;
}
.el-submenu {
  margin-bottom: .5rem;
  color: white;
  background-color: #525d61;
  box-shadow: 0 3px 3px rgba(0,0,0,.2);
  &.is-opened {
    .el-submenu__title {
      background-color: darken(#545c64, 15%) !important;
    }
    .el-menu-item {
      background-color: darken(#545c64, 20%) !important;
      &.is-active {
        background-color: darken(#545c64, 30%) !important;
      }
    }
  }
}
.el-submenu__title {
  color: white;
  background-color: #454e52;
}
.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: darken(#545c64, 10%);
}
.el-menu-item.is-active {
  color: white;
  background-color: darken(#545c64, 10%) !important;
}
.el-submenu .el-menu-item {
  background-color: #454e52;
}
.el-menu-item {
  color: white;
  background-color: #3d4349;
}
</style>
