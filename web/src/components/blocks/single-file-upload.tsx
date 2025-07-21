import {
  AlertCircleIcon,
  CircleXIcon,
  ExternalLinkIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  ImageUpIcon,
  Loader2Icon,
  VideoIcon,
  XIcon,
} from "lucide-react";

import {
  formatBytes,
  useFileUpload,
  type FileUploadOptions,
} from "@/hooks/use-file-upload";
import { Button } from "../ui/button";

type SingleFileUploadProps = FileUploadOptions & {
  disabled?: boolean;
  loading?: boolean;
  error?: unknown;
  url?: string;
};

export function SingleFileUpload(props: SingleFileUploadProps) {
  const maxSizeMB = props.maxSize ? props.maxSize / 1024 / 1024 : 0;

  const disabled = props.disabled || props.loading || false;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    ...props,
    multiple: false,
    maxFiles: 1,
  });

  const previewUrl =
    files?.length > 0 && files[0] ? getFilePreview(files[0]) : null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          onClick={disabled ? undefined : openFileDialog}
          onDragEnter={disabled ? undefined : handleDragEnter}
          onDragLeave={disabled ? undefined : handleDragLeave}
          onDragOver={disabled ? undefined : handleDragOver}
          onDrop={disabled ? undefined : handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />
          {props.loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className="size-4 animate-spin" />
            </div>
          ) : (
            <>
              {props.error ? (
                <div className="absolute inset-0">
                  <div className="bg-red-500/20 text-muted-foreground/80 relative flex flex-col rounded-md h-full w-full">
                    <div className="flex items-center justify-center flex-1">
                      <CircleXIcon className="size-4" />
                    </div>
                    <div className="flex min-w-0 flex-col gap-0.5 border-t p-3">
                      <p className="truncate text-[13px] font-medium">
                        {"File Corrupted or Not Found"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {previewUrl ? (
                    <div className="absolute inset-0">
                      <div className="bg-background relative flex flex-col rounded-md h-full w-full">
                        {previewUrl}
                        {/* <Button
                  onClick={() => removeFile(file.id)}
                  size="icon"
                  className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                  aria-label="Remove image"
                >
                  <XIcon className="size-3.5" />
                </Button> */}
                        <div className="flex min-w-0 flex-col gap-0.5 border-t p-3">
                          <p className="truncate text-[13px] font-medium">
                            {getFileName(files[0])}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {formatBytes(files[0].file.size)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                      <div
                        className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                      >
                        <ImageUpIcon className="size-4 opacity-60" />
                      </div>
                      <p className="mb-1.5 text-sm font-medium">
                        Drop your image here or click to browse
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Max size: {maxSizeMB}MB
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {!!props.error && (
          <div className="absolute top-4 right-4 flex gap-2">
            {!!props.url && <PreviewButton url={props.url} />}
            <RemoveButton onClick={() => props?.onFilesChange?.([])} />
          </div>
        )}

        {previewUrl && (
          <div className="absolute top-4 right-4 flex gap-2">
            {!!props.url && <PreviewButton url={props.url} />}
            <RemoveButton onClick={() => removeFile(files[0]?.id)} />
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}

const getFileName = (file: {
  file: File | { type: string; name: string; url?: string };
}) => {
  return file.file instanceof File ? file.file.name : file.file.name;
};

const getFilePreview = (file: {
  file: File | { type: string; name: string; url?: string };
}) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  const renderImage = (src: string) => (
    <img
      src={src}
      alt={fileName}
      className="size-full rounded-t-[inherit] object-cover"
    />
  );

  return (
    <div className="bg-accent flex h-full w-full items-center justify-center overflow-hidden rounded-t-[inherit]">
      {fileType.startsWith("image/") ? (
        file.file instanceof File ? (
          (() => {
            const previewUrl = URL.createObjectURL(file.file);
            return renderImage(previewUrl);
          })()
        ) : file.file.url ? (
          renderImage(file.file.url)
        ) : (
          <ImageIcon className="size-5 opacity-60" />
        )
      ) : (
        getFileIcon(file)
      )}
    </div>
  );
};

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  const iconMap = {
    pdf: {
      icon: FileTextIcon,
      conditions: (type: string, name: string) =>
        type.includes("pdf") ||
        name.endsWith(".pdf") ||
        type.includes("word") ||
        name.endsWith(".doc") ||
        name.endsWith(".docx"),
    },
    archive: {
      icon: FileArchiveIcon,
      conditions: (type: string, name: string) =>
        type.includes("zip") ||
        type.includes("archive") ||
        name.endsWith(".zip") ||
        name.endsWith(".rar"),
    },
    excel: {
      icon: FileSpreadsheetIcon,
      conditions: (type: string, name: string) =>
        type.includes("excel") ||
        name.endsWith(".xls") ||
        name.endsWith(".xlsx"),
    },
    video: {
      icon: VideoIcon,
      conditions: (type: string) => type.includes("video/"),
    },
    audio: {
      icon: HeadphonesIcon,
      conditions: (type: string) => type.includes("audio/"),
    },
    image: {
      icon: ImageIcon,
      conditions: (type: string) => type.startsWith("image/"),
    },
  };

  for (const { icon: Icon, conditions } of Object.values(iconMap)) {
    if (conditions(fileType, fileName)) {
      return <Icon className="size-5 opacity-60" />;
    }
  }

  return <FileIcon className="size-5 opacity-60" />;
};

function PreviewButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex gap-2 px-4 h-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
      aria-label="Open in new tab"
    >
      <ExternalLinkIcon className="size-4" aria-hidden="true" />
      <span className="text-xs">Open</span>
    </a>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
      onClick={onClick}
      aria-label="Remove image"
    >
      <XIcon className="size-4" aria-hidden="true" />
    </button>
  );
}
