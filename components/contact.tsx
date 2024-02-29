import style from "../styles/contact.module.scss";
import Arrowdown from "../public/images/Arrowdown";
import { useState } from "react";
import json from "../product.json";
import { useContactForm } from "../contact.form";

export default function Contact({ dict }: any) {
  const { kind } = json;
  const {
    question: { privatee, des },
  } = dict;
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
        <h1>{des.title}</h1>
        <div className={style.section}>
          <Input
            title={des.company}
            placeholder={des.company}
            register={register.company}
            error={errors.company?.message}
          />
          <Input
            title={des.department}
            placeholder={des.department}
            register={register.department}
            error={errors.department?.message}
          />
        </div>
        <div className={style.section}>
          <Input
            title={des.manager}
            placeholder={des.manager}
            register={register.manager}
            error={errors.manager?.message}
          />
          <Input
            title={des.email}
            placeholder={des.email}
            register={register.email}
            error={errors.email?.message}
          />
        </div>
        <div className={style.section}>
          <div className={style.selectContainer}>
            <label>
              {des.select}
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
                  {des.select}
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
                {des.required}
                <span style={{ color: "#D7506B" }}>*</span>
              </label>
            </div>
            {errors.check_agree_privacy?.message && (
              <span className={style.errorLine}></span>
            )}
          </div>
          <div className={style.desc}>
            {privatee.map((item: any, i: number) => (
              <div key={`reason: ${i}`} className={style.article}>
                <span className={style.key}>{item.key}</span>
                <span className={style.value}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={style.btn}>
          <button disabled={!isValid} type="submit">
            {des.confirm}
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
