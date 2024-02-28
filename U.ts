const U = {
  validEmailPattern: /^([a-z0-9_\.-]{1,})@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  validNickNamePattern: /^(?:[가-힣]{2,15}|[A-Za-z0-9]{4,30})$/,
  validPasswordPattern:
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_\-+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_\-+=]{8,20}$/,
};

export default U;
