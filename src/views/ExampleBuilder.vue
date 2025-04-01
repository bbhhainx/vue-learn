<template></template>
<script setup lang="ts">

/** kiểu của builder */
interface UserBuilder {
  setName: Function;
  setAge: Function;
  setAddress: Function;
  setPhone: Function;
  setEmail: Function;
}

/** lớp người dùng */
class User {
  constructor(
    public name?: string,
    public email?: string,
    public age?: number,
    public address?: string,
    public phone?: string
  ) {}

  showInfo() {
    console.log(this.name, this.email, this.age, this.address, this.phone);
  }
}

/** lớp xây dựng người dùng */
class UserBuilderImpl implements UserBuilder {
  private user: User;

  constructor() {
    this.user = new User();
  }

  /** khởi tạo tên */
  setName(name: string) {
    this.user.name = name;
    return this;
  }

  /** khởi tạo email */
  setEmail(email: string) {
    this.user.email = email;
    return this;
  }

  /** khởi tạo tuổi */
  setAge(age: number) {
    this.user.age = age;
    return this;
  }

  /** khởi tạo địa chỉ */
  setAddress(address: string) {
    this.user.address = address;
    return this;
  }

  /** khởi tạo số điện thoại */
  setPhone(phone: string) {
    this.user.phone = phone;
    return this;
  }

  /** trả về đối tượng người dùng đã được xây dựng */
  build() {
    return this.user;
  }
}

/** lớp giám đốc */
class Director {
  /** đối tượng xây dựng người dùng */
  private builder: UserBuilder;

  constructor(builder: UserBuilder) {
    this.builder = builder;
  }

  /** xây dựng người dùng đầu tiên */
  public buildFirst(name: string, email: string) {
    return this.builder.setName(name).setEmail(email).build();
  }

  /** xây dựng người dùng thứ hai */
  public buildSecond(name: string, email: string, age: number) {
    return this.builder.setName(name).setEmail(email).setAge(age).build();
  }
}

/** khởi tạo đối tượng xây dựng người dùng */
const builder = new UserBuilderImpl()
/** khởi tạo đối tượng giám đốc */
const director = new Director(builder);

/** xây dựng người dùng đầu tiên */
const user = director.buildFirst('Hải','nxh@gmail.com')
console.log(user.showInfo())

/** xây dựng người dùng thứ hai */
const user2 = director.buildSecond('Builder','abc@gmail.com', 20)
console.log(user2.showInfo())


</script>
