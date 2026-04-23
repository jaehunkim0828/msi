import style from "../styles/contact.module.scss";
import Arrowdown from "../public/images/Arrowdown";
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { useContactForm } from "../contact.form";

export default function Contact({ dict }: any) {
  const {
    question: { privatee, des },
  } = dict;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentLength, setContentLength] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    form: {
      formState: { errors, isValid },
      reset,
      setValue,
    },
    register,
    onSubmit,
    watchedType,
  } = useContactForm();

  const handleTypeSelect = (type: "제품" | "서비스") => {
    setValue("type", type, { shouldValidate: true });
  };

  const isProduct = watchedType === "제품";
  const isService = watchedType === "서비스";

  // 파일 관리
  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/quicktime",
    ];
    const maxSize = 10 * 1024 * 1024;
    const validFiles = Array.from(newFiles).filter((f) => {
      if (!allowed.includes(f.type)) {
        alert(`허용되지 않는 파일 형식입니다: ${f.name}`);
        return false;
      }
      if (f.size > maxSize) {
        alert(`파일 크기가 10MB를 초과합니다: ${f.name}`);
        return false;
      }
      return true;
    });
    setFiles((prev) => {
      const combined = [...prev, ...validFiles];
      if (combined.length > 5) {
        alert("최대 5개까지 첨부할 수 있습니다.");
        return combined.slice(0, 5);
      }
      return combined;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      // 서비스 문의 + 파일 있으면 먼저 업로드
      if (isService && files.length > 0) {
        const formData = new FormData();
        files.forEach((f) => formData.append("files", f));
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          alert(uploadData.error || "파일 업로드 실패");
          return;
        }
        // attachments URL을 form data에 추가
        setValue("attachments", JSON.stringify(uploadData.urls));
      }

      await onSubmit(e);
      if (isValid) {
        reset();
        setContentLength(0);
        setFiles([]);
      }
    } catch (err) {
      console.error("문의 제출 에러:", err);
      alert("문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className={style.contactContainer}>
      {isSubmitting && (
        <div className={style.loadingModal}>
          <div className={style.loadingContent}>
            <div className={style.spinner}></div>
            <p>문의를 전송하고 있습니다...</p>
            <span>잠시만 기다려주세요</span>
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className={style.contactForm}>
        <h1>{des.title}</h1>

        {/* 유형 선택 탭 */}
        <div className={style.section}>
          <div className={style.typeSelector}>
            <label>
              {des.category}
              <span style={{ color: "#D7506B" }}>*</span>
            </label>
            <div className={style.typeBtns}>
              {(des.categoryItem as string[]).map((item: string, i: number) => (
                <button
                  key={item}
                  type="button"
                  className={`${style.typeBtn} ${
                    (i === 0 && isProduct) || (i === 1 && isService)
                      ? style.typeBtnActive
                      : ""
                  }`}
                  onClick={() =>
                    handleTypeSelect(i === 0 ? "제품" : "서비스")
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 유형이 선택된 후에만 필드 표시 */}
        {watchedType && (
          <div className={style.fieldsWrapper}>
            {/* 공통 필드 */}            
            <div className={style.section}>
              <Input
                title={des.common.company}
                placeholder={des.common.company}
                register={register.company}
                error={errors.company?.message}
                required
              />
              <Input
                title={des.common.manager}
                placeholder={des.common.manager}
                register={register.manager}
                error={errors.manager?.message}
                required
              />
            </div>
            <div className={style.section}>
              <Input
                title={des.common.position}
                placeholder={des.common.position}
                register={register.position}
                error={errors.position?.message}
              />
              <Input
                title={des.common.email}
                placeholder={des.common.email}
                register={register.email}
                error={errors.email?.message}
                required
              />
            </div>
            <div className={style.section}>
              <Input
                title={des.common.phone}
                placeholder="010-0000-0000"
                register={register.phone}
                error={errors.phone?.message}
                required
              />
              {/* 서비스 문의: 부서명 */}
              {isService ? (
                <Input
                  title={des.service.department}
                  placeholder={des.service.department}
                  register={register.department}
                  error={errors.department?.message}
                  required
                />
              ) : (
                <div className={style.inputContainer} style={{ visibility: "hidden" }} />
              )}
            </div>

            {/* 제품 문의 전용 필드 */}
            {isProduct && (
              <>
                <div className={style.sectionDivider}>
                  <span>{des.product.sectionTitle}</span>
                </div>
                <div className={style.section}>
                  <Select
                    title={des.product.product}
                    options={des.product.productOptions}
                    register={register.product}
                    error={errors.product?.message}
                    required
                  />
                  <Select
                    title={des.product.inquiryType}
                    options={des.product.inquiryTypeOptions}
                    register={register.inquiryType}
                    error={errors.inquiryType?.message}
                    required
                  />
                </div>
                <div className={style.section}>
                  <div className={style.textareaContainer}>
                    <label>
                      {des.product.content}
                      <span style={{ color: "#D7506B" }}>*</span>
                    </label>
                    <textarea
                      className={style.fillBox}
                      style={{
                        borderColor: errors.content?.message
                          ? "#D7506B"
                          : "#9a9ea5",
                        minHeight: "150px",
                        resize: "vertical",
                      }}
                      {...register.content}
                      placeholder={des.product.content}
                      maxLength={1000}
                      onChange={(e) => {
                        register.content.onChange(e);
                        setContentLength(e.target.value.length);
                      }}
                    />
                    <div className={style.charCount}>
                      {contentLength} / 1000
                    </div>
                    {errors.content?.message && (
                      <p className={style.msg}>{errors.content?.message}</p>
                    )}
                  </div>
                </div>

                {/* 선택사항 */}
                <div className={style.optionalSection}>                  
                  <div className={style.optionalFields}>
                    <div className={style.section}>
                      <Select
                        title={des.product.expectedTimeline}
                        options={des.product.expectedTimelineOptions}
                        register={register.expectedTimeline}
                        error={errors.expectedTimeline?.message}
                      />
                      <Input
                        title={des.product.currentEquipment}
                        placeholder={des.product.currentEquipment}
                        register={register.currentEquipment}
                        error={errors.currentEquipment?.message}
                      />
                    </div>
                    <div className={style.section}>
                      <Input
                        title={des.product.productionVolume}
                        placeholder={des.product.productionVolume}
                        register={register.productionVolume}
                        error={errors.productionVolume?.message}
                      />
                      <Input
                        title={des.product.budgetRange}
                        placeholder={des.product.budgetRange}
                        register={register.budgetRange}
                        error={errors.budgetRange?.message}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 서비스 문의 전용 필드 */}
            {isService && (
              <>
                <div className={style.sectionDivider}>
                  <span>{des.service.sectionTitle}</span>
                </div>
                <div className={style.section}>
                  <Select
                    title={des.service.equipmentModel}
                    options={des.service.equipmentModelOptions}
                    register={register.equipmentModel}
                    error={errors.equipmentModel?.message}
                    required
                  />
                  <Input
                    title={des.service.serialNumber}
                    placeholder={des.service.serialNumber}
                    register={register.serialNumber}
                    error={errors.serialNumber?.message}
                    required
                  />
                </div>
                <div className={style.section}>
                  <Input
                    title={des.service.installLocation}
                    placeholder={des.service.installLocation}
                    register={register.installLocation}
                    error={errors.installLocation?.message}
                    required
                  />
                  <Select
                    title={des.service.issueType}
                    options={des.service.issueTypeOptions}
                    register={register.issueType}
                    error={errors.issueType?.message}
                    required
                  />
                </div>
                <div className={style.section}>
                  <Select
                    title={des.service.lineStatus}
                    options={des.service.lineStatusOptions}
                    register={register.lineStatus}
                    error={errors.lineStatus?.message}
                    required
                  />
                  <div className={style.inputContainer}>
                    <label>
                      {des.service.issueDate}
                      <span style={{ color: "#D7506B" }}>*</span>
                    </label>
                    <input
                      type="datetime-local"
                      className={style.fillBox}
                      style={{
                        borderColor: errors.issueDate?.message
                          ? "#D7506B"
                          : "#9a9ea5",
                      }}
                      {...register.issueDate}
                    />
                    {errors.issueDate?.message && (
                      <p className={style.msg}>{errors.issueDate?.message}</p>
                    )}
                  </div>
                </div>
                <div className={style.section}>
                  <div className={style.textareaContainer}>
                    <label>
                      {des.service.content}
                      <span style={{ color: "#D7506B" }}>*</span>
                    </label>
                    <textarea
                      className={style.fillBox}
                      style={{
                        borderColor: errors.content?.message
                          ? "#D7506B"
                          : "#9a9ea5",
                        minHeight: "150px",
                        resize: "vertical",
                      }}
                      {...register.content}
                      placeholder={des.service.content}
                      maxLength={1000}
                      onChange={(e) => {
                        register.content.onChange(e);
                        setContentLength(e.target.value.length);
                      }}
                    />
                    <div className={style.charCount}>
                      {contentLength} / 1000
                    </div>
                    {errors.content?.message && (
                      <p className={style.msg}>{errors.content?.message}</p>
                    )}
                  </div>
                </div>

                {/* 파일 첨부 */}
                <div className={style.section}>
                  <div className={style.uploadSection}>
                    <label>{des.service.attachments}</label>
                    <p className={style.uploadDesc}>
                      {des.service.attachmentsDesc}
                    </p>
                    <p className={style.uploadExpiry}>
                      {des.service.attachmentsExpiry}
                    </p>
                    <div
                      className={`${style.uploadArea} ${
                        isDragging ? style.uploadAreaDragging : ""
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className={style.uploadIcon}>+</div>
                      <p>{des.service.dragDrop}</p>
                      <span>{des.service.allowedFormats}</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                        style={{ display: "none" }}
                        onChange={handleFileInput}
                      />
                    </div>
                    {files.length > 0 && (
                      <div className={style.fileList}>
                        {files.map((file, i) => (
                          <div key={`${file.name}-${i}`} className={style.fileItem}>
                            <div className={style.fileInfo}>
                              <span className={style.fileName}>
                                {file.name}
                              </span>
                              <span className={style.fileSize}>
                                {formatFileSize(file.size)}
                              </span>
                            </div>
                            <button
                              type="button"
                              className={style.fileRemove}
                              onClick={() => removeFile(i)}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* 개인정보 동의 */}
            <div className={style.checkContainer}>
              <div className={style.check}>
                <div className={style.inner}>
                  <input
                    id="check_contact"
                    {...register.check_agree_privacy}
                    type="checkbox"
                  />
                  <label htmlFor="check_contact">
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

            {/* 제출 버튼 */}
            <div className={style.btn}>
              <button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? "전송 중..." : des.confirm}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

function Input({
  title,
  placeholder,
  register,
  error,
  required,
}: {
  title: string;
  placeholder: string;
  register: any;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className={style.inputContainer}>
      <label>
        {title} {required && <span style={{ color: "#D7506B" }}>*</span>}
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

function Select({
  title,
  options,
  register,
  error,
  required,
}: {
  title: string;
  options: string[];
  register: any;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className={style.selectContainer}>
      <label>
        {title} {required && <span style={{ color: "#D7506B" }}>*</span>}
      </label>
      <div className={style.select}>
        <select
          className={style.fillBox}
          style={{ borderColor: error ? "#D7506B" : "#9a9ea5" }}
          {...register}
          defaultValue="default"
        >
          <option value="default" disabled>
            {title}
          </option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className={style.selectArrow}>
          <Arrowdown size={20} color="black" />
        </div>
      </div>
      {error && <p className={style.msg}>{error}</p>}
    </div>
  );
}
