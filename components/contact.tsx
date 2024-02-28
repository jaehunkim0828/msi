import style from "../styles/contact.module.scss";
import Arrowdown from "../public/images/Arrowdown";
import { useState } from "react";
import json from "../product.json";
import { useContactForm } from "../contact.form";

export default function Contact() {
  const { kind, privatee } = json;
  const [isShowToastBar, setIsShowToastBar] = useState(false);

  const {
    form: {
      formState: { errors, isValid },
      reset,
    },
    register,
    onSumbit,
  } = useContactForm();

  return (
    <div className={style.contactContainer}>
      <form
        onSubmit={async data => {
          try {
            await onSumbit(data);
            if (isValid) {
              setIsShowToastBar(true);
              reset();
            }
          } catch (err) {
            console.log(err);
          }
        }}
        className={style.contactForm}
      >
        <h1>문의하기</h1>
        <div className={style.section}>
          <Input
            title={"회사이름"}
            placeholder={"회사이름을 입력해주세요"}
            register={register.company}
            error={errors.company?.message}
          />
          <Input
            title={"부서이름"}
            placeholder={"부서이름을 작성해주세요"}
            register={register.department}
            error={errors.department?.message}
          />
        </div>
        <div className={style.section}>
          <Input
            title={"이름"}
            placeholder={"이름을 작성해주세요"}
            register={register.manager}
            error={errors.manager?.message}
          />
          <Input
            title={"이메일"}
            placeholder={"이메일을 입력해주세요"}
            register={register.email}
            error={errors.email?.message}
          />
        </div>
        <div className={style.section}>
          <div className={style.selectContainer}>
            <label>
              머신 선택
              <span style={{ color: "#D7506B" }}>*</span>
            </label>
            <div className={style.select}>
              <select
                style={{
                  borderColor: errors.mecanic?.message ? "#D7506B" : "#9a9ea5",
                }}
                className={style.fillBox}
                {...register.mecanic}
                defaultValue="default"
              >
                <option
                  value="default"
                  disabled
                  // selected
                >
                  머신 선택
                </option>
                {kind.map((mecanic, i) => (
                  <option key={`mecanic-key: ${mecanic}`} value={mecanic}>
                    {mecanic}
                  </option>
                ))}
              </select>
              <div className={style.selectArrow}>
                <Arrowdown size={20} color="black" />
              </div>
            </div>
            {errors.mecanic?.message && (
              <p className={style.msg}>{errors.mecanic?.message}</p>
            )}
          </div>
        </div>
        <div className={style.checkContainer}>
          <div className={style.check}>
            <div className={style.inner}>
              <input
                id="check_contact"
                {...register.check_agree_privacy}
                type="checkbox"
              />
              <label htmlFor={"check_contact"}>
                {"개인 정보 수집/이용취급 동의(필수)"}
                <span style={{ color: "#D7506B" }}>*</span>
              </label>
            </div>
            {errors.check_agree_privacy?.message && (
              <span className={style.errorLine}></span>
            )}
          </div>
          <div className={style.desc}>
            {privatee.map((item, i) => (
              <div key={`reason: ${i}`} className={style.article}>
                <span className={style.key}>{item.key}</span>
                <span className={style.value}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={style.btn}>
          <button disabled={!isValid} type="submit">
            작성완료
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ title, placeholder, register, error }: any) {
  return (
    <div className={style.inputContainer}>
      <label>
        {title} <span style={{ color: "#D7506B" }}>*</span>
      </label>
      <input
        className={style.fillBox}
        style={{ borderColor: error ? "#D7506B" : "#9a9ea5" }}
        {...register}
        placeholder={placeholder}
      />
      {error && <p className={style.msg}>{error}</p>}
    </div>
  );
}
