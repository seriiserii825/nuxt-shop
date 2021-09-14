<template lang="pug">
  .popup
    .popup__overlay(@click="closePopup")
    .popup__content
      transition(name="fade" appear mode="out-in" )
        .popup__success(v-if="successEmail" key="success")
          svg(xmlns='http://www.w3.org/2000/svg', width='300', height='300')
            path(style='stroke:none;fill-rule:nonzero;fill:#1467A4;fill-opacity:1', d='M273.203 167.984c5.14-8.703 8.047-17.984 8.047-29.203 0-25.793-21.809-50.144-50.285-50.144H209.59c2.883-7.508 5.183-16.485 5.183-27.27C214.773 18.711 192.691 0 158.953 0c-36.098 0-34.039 55.625-42.047 63.633-13.328 13.328-29.07 38.933-40.289 48.867H18.75C8.395 112.5 0 120.895 0 131.25v140.625c0 10.355 8.395 18.75 18.75 18.75h37.5c8.727 0 16.059-5.96 18.152-14.031 26.078.586 43.98 23.398 104.18 23.398 4.23 0 8.918.008 13.02.008 45.187 0 65.617-23.098 66.175-55.86 7.805-10.792 11.895-25.265 10.16-39.25 5.774-10.812 8.008-23.636 5.266-36.906zm-36.18 31.54c7.36 12.382.739 28.949-8.168 33.73 4.512 28.582-10.316 38.613-31.125 38.613h-22.16c-41.976 0-69.156-22.156-100.57-22.156V140.625h6.398c16.618 0 39.832-41.535 55.395-57.105 16.617-16.618 11.082-44.317 22.16-55.395 27.695 0 27.695 19.324 27.695 33.238 0 22.953-16.617 33.239-16.617 55.395h60.934c12.367 0 22.105 11.082 22.16 22.16.05 11.074-7.512 22.156-13.05 22.156 7.905 8.528 9.593 26.504-3.052 38.45zm-185.46 53.601c0 7.766-6.297 14.063-14.063 14.063-7.766 0-14.063-6.297-14.063-14.063 0-7.766 6.297-14.063 14.063-14.063 7.766 0 14.063 6.297 14.063 14.063zm0 0')
        .popup__body(v-else key="fail")
          h3.popup__title {{ $t('popup.title') }}
          el-form.demo-ruleForm(:model='ruleForm', :rules='rules', ref='ruleForm')
            .popup__close(@click="closePopup")
              svg(width='17', height='18', viewbox='0 0 17 18', fill='none', xmlns='http://www.w3.org/2000/svg')
                line(x1='1.06066', y1='1.93934', x2='15.2028', y2='16.0815', stroke='#1467a4', stroke-width='3')
                line(x1='15.2032', y1='2.06066', x2='1.0611', y2='16.2028', stroke='#1467a4', stroke-width='3')
            el-form-item( prop='name')
              el-input(:placeholder="$t('popup.name')", v-model='ruleForm.name')
              svg(width='20', height='22', viewbox='0 0 20 22', fill='none', xmlns='http://www.w3.org/2000/svg')
                path(d='M9.7779 13.4243C13.5212 13.4243 16.5558 10.579 16.5558 7.06909C16.5558 3.5592 13.5212 0.713867 9.7779 0.713867C6.03457 0.713867 3 3.5592 3 7.06909C3 10.579 6.03457 13.4243 9.7779 13.4243Z' )
                path(d='M19.5713 18.9122C21.1449 16.7855 18.1327 14.3742 14.6622 13.0688C13.3443 13.9406 11.7389 14.4548 10.0069 14.4548C8.27263 14.4548 6.66584 13.9393 5.34659 13.0659C1.8727 14.3706 -1.146 16.7837 0.428495 18.9125C3.15656 22.5989 16.8432 22.5989 19.5713 18.9122Z' )
            el-form-item( prop='company')
              el-input(:placeholder="$t('popup.company')", v-model='ruleForm.company' )
              svg(width='24', height='19', viewbox='0 0 24 19', fill='none', xmlns='http://www.w3.org/2000/svg')
                path(d='M1.35211 18.5748H22.6479C23.0065 18.5748 23.3504 18.4509 23.604 18.2303C23.8575 18.0097 24 17.7105 24 17.3986V5.93075C24 5.6188 23.8575 5.31964 23.604 5.09906C23.3504 4.87848 23.0065 4.75456 22.6479 4.75456H19.2676C19.178 4.75456 19.092 4.72358 19.0286 4.66844C18.9652 4.61329 18.9296 4.5385 18.9296 4.46051V2.10814C18.9296 1.56223 18.6803 1.03869 18.2365 0.652676C17.7928 0.266664 17.1909 0.0498047 16.5634 0.0498047H7.43662C6.80906 0.0498047 6.20721 0.266664 5.76347 0.652676C5.31972 1.03869 5.07042 1.56223 5.07042 2.10814V4.46051C5.07042 4.5385 5.03481 4.61329 4.97142 4.66844C4.90802 4.72358 4.82204 4.75456 4.73239 4.75456H1.35211C0.99351 4.75456 0.649595 4.87848 0.396025 5.09906C0.142454 5.31964 0 5.6188 0 5.93075V17.3986C0 17.7105 0.142454 18.0097 0.396025 18.2303C0.649595 18.4509 0.99351 18.5748 1.35211 18.5748ZM7.09859 2.10814C7.09859 2.03015 7.1342 1.95536 7.1976 1.90021C7.26099 1.84507 7.34697 1.81409 7.43662 1.81409H16.5634C16.6078 1.81409 16.6517 1.82169 16.6927 1.83647C16.7337 1.85125 16.771 1.87291 16.8024 1.90021C16.8338 1.92752 16.8587 1.95993 16.8757 1.99561C16.8927 2.03128 16.9014 2.06952 16.9014 2.10814V4.46051C16.9014 4.5385 16.8658 4.61329 16.8024 4.66844C16.739 4.72358 16.653 4.75456 16.5634 4.75456H7.43662C7.34697 4.75456 7.26099 4.72358 7.1976 4.66844C7.1342 4.61329 7.09859 4.5385 7.09859 4.46051V2.10814Z')
            .form-flex
              el-form-item( prop='email')
                el-input(placeholder='Email', v-model='ruleForm.email', type="email")
                svg(width='24', height='15', viewbox='0 0 24 15', fill='none', xmlns='http://www.w3.org/2000/svg')
                  path(d='M1.84615 0.154785C1.48326 0.154785 1.15018 0.24972 0.865385 0.408009L11.2596 8.77203C11.715 9.13867 12.305 9.13864 12.7596 8.77203L23.1346 0.408009C22.8498 0.24972 22.5167 0.154785 22.1538 0.154785H1.84615ZM0.115385 1.23296C0.0450769 1.40562 0 1.58569 0 1.78023V12.6436C0 12.9737 0.108215 13.2779 0.298092 13.534L7.64425 7.30179L0.115385 1.23296ZM23.8846 1.23296L16.375 7.29361L23.7019 13.534C23.8918 13.2779 24 12.9737 24 12.6436V1.78023C24 1.58569 23.9549 1.40562 23.8846 1.23296ZM15.4808 8.02058L13.6058 9.53164C12.7129 10.2518 11.3065 10.2507 10.4135 9.53164L8.53846 8.02873L1.26923 14.1874C1.45105 14.2399 1.64394 14.2691 1.84615 14.2691H22.1538C22.3561 14.2691 22.549 14.2399 22.7308 14.1874L15.4808 8.02058Z')
              el-form-item( prop='phone')
                el-input(:placeholder="$t('popup.phone')", v-model='ruleForm.phone')
                svg(width='24', height='22', viewbox='0 0 24 22', fill='none', xmlns='http://www.w3.org/2000/svg')
                  path(fill-rule='evenodd', clip-rule='evenodd', d='M6.44463 7.645L8.42534 5.81728C8.78547 5.49942 8.96554 4.78423 8.42534 4.30743L4.64399 0.572523C4.64399 0.572523 3.74366 0.0162604 2.93337 0.413591C2.21311 0.810921 -0.66792 2.79757 0.142371 7.16821C1.04269 12.0156 10.6762 20.598 16.1681 21.3132C21.1199 22.0284 23.3707 19.5649 23.8209 18.8497C24.271 18.1345 23.7308 17.3399 23.7308 17.3399L19.4093 14.0023C18.689 13.3666 18.0588 13.6844 17.6987 14.0023L15.718 15.7505C14.1874 16.7041 5.36424 8.91646 6.44463 7.645Z')
            el-form-item( prop='message' class="el-form-textarea")
              el-input(:placeholder="$t('popup.message')", v-model='ruleForm.message', type="textarea")
              svg(width='24', height='19', viewbox='0 0 24 19', fill='none', xmlns='http://www.w3.org/2000/svg')
                path(d='M0.80382 18.2441C-0.26794 18.2441 -0.26794 16.8063 0.80382 16.8063H9.08573C10.1575 16.8063 10.1575 18.2441 9.08573 18.2441H0.80382ZM22.2825 5.17531L20.9322 4.4876L16.1061 11.8617L15.2488 11.4252L20.0749 4.05079L18.7235 3.36243L11.3648 14.605L14.9242 16.4179L22.2825 5.17531ZM11.1021 15.6259L11.1784 18.5175L14.0529 17.1287L11.1021 15.6259ZM19.3082 2.46898L22.8672 4.28154L23.8711 2.74751C24.0137 2.52976 24.1331 1.94572 23.6821 1.71594L21.4193 0.563796C20.9698 0.334991 20.4547 0.716549 20.3121 0.934953L19.3082 2.46898Z')
            .popup__footer
              el-button(type='primary', @click="submitForm('ruleForm')", :disabled="!checked") {{ $t('popup.submit') }}
              .popup__privacy
                el-checkbox(v-model='checked')
                  span {{ $t('popup.privacy') }}
                  nuxt-link(to="/privacy-policy" target="_blank") privacy policy
</template>

<script>
export default {
  data() {
    return {
      successEmail: false,
      ruleForm: {
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      },
      rules: {
        name: [
          { required: true, message: this.$i18n.t('popup.require'), trigger: 'blur' },
        ],
        company: [
          { required: true, message: this.$i18n.t('popup.require'), trigger: 'blur' },
        ],
        email: [
          { required: true, message: this.$i18n.t('popup.require'), trigger: 'blur' },
          { type: 'email', message: this.$i18n.t('popup.email'), trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: this.$i18n.t('popup.require'), trigger: 'blur' },
        ],
        message: [
          { required: true, message: this.$i18n.t('popup.require'), trigger: 'blur' },
        ],
      },
      checked: false
    }
  },
  methods: {
    submitForm() {
      // console.log(process.env.baseUrl, 'process.env.baseUrl')
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios.$post('/api/', {
              body: JSON.stringify(this.ruleForm)
            })
            .then(res => {
              if (res.message === 'Successs') {
                this.successEmail = true;
                setTimeout(() => {
                  this.$store.dispatch('popup/setPopup', false);
                }, 2000);
              }
            })
            .catch(error => console.log(error, 'error'))
        } else {
          console.log('Form is not valid');
          return false;
        }
      });
    },
    closePopup() {
      this.$store.dispatch('popup/setPopup', false)
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/partials/variables";
.popup {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
  &__success {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40rem;
  }
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index: 1;
  }
  &__content {
    .el-form-textarea {
      position: relative;
      .el-form-item__content {
        svg {
          position: absolute;
          top: initial;
          bottom: 1rem;
          left: 2rem;
          width: 2.4rem;
          height: 1.8rem;
        }
      }
    }
    textarea,
    .el-input {
      padding-left: 4rem;
      border: 2px solid #e9e9e9;
      border-radius: 2px;
      input {
        border: none;
      }
    }
    .el-form-item__content {
      position: relative;
      &:focus {
        border-color: $accent;
      }
      svg {
        position: absolute;
        top: 50%;
        left: 2rem;
        transform: translateY(-50%);
        width: 2rem;
        height: 2rem;
        fill: #ededed;
      }
    }
  }
  .el-form-item {
    &:nth-of-type(2) {
      svg {
        width: 2.4rem;
        height: 1.8rem;
      }
    }
    &.is-error {
      .el-input {
        border-color: red;
      }
    }
    &.is-success {
      .el-input {
        border-color: $accent-light;
      }
      input {
        color: #83cbe9;
      }
      textarea {
        border-color: $accent-light;
        color: #83cbe9;
      }
      svg {
        fill: #83cbe9;
      }
    }
  }
  textarea {
    padding-top: 1rem;
    padding-left: 2rem;
    height: 15rem;
  }
  .form-flex {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      display: block;
    }
    .el-form-item {
      width: 48%;
      @media screen and (max-width: 768px) {
        width: auto;
      }
      &:nth-of-type(1) {
        svg {
          width: 2.4rem;
          height: 1.4rem;
        }
      }
      &:nth-of-type(2) {
        svg {
          width: 2.4rem;
          height: 2.1rem;
        }
      }
    }
  }
  &__title {
    margin-bottom: 2rem;
    font-size: 4rem;
    font-weight: bold;
    color: $accent-dark;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      display: block;
    }
    button {
      flex: 0 0 23.7rem;
      height: 6.2rem;
      font-size: 1.6rem;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 2px;
      @media screen and (max-width: 768px) {
        margin-bottom: 3rem;
        width: 100%;
      }
    }
  }
  &__privacy {
    flex: 1;
    padding-left: 3rem;
    font-size: 1.4rem;
    line-height: 1.5;
    a {
      margin-left: 0.4rem;
      color: $accent-light;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: inherit;
    }
  }
  .el-checkbox {
    display: flex;
    .el-checkbox__input {
      margin-top: 0.4rem;
    }
  }
  .el-checkbox, .el-checkbox__input {
    white-space: initial;
  }
}
</style>
