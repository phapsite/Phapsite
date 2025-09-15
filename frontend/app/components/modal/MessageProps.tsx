interface MessageProps {
  errors: string[];
  successMessage: string;
  loading: boolean;
}

export function ModalMessage({ errors, successMessage, loading }: MessageProps) {
  return (
    <div className="message-wrapper">
      {/* Errors */}
      {errors.length > 0 && (
        <ul className="modal-errors">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      {/* Success */}
      {successMessage && (
        <div className="modal-success">
          {successMessage}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className={`modal-loading ${loading ? "show" : ""}`}>
          <div className="spinner"></div> Sending...
        </div>
      )}
    </div>
  );
}