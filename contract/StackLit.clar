;; Map structure to store investment data
;; Using map instead of array is more common in Clarity
(define-map invests 
    uint ;; index/id
    {
        amount: uint,
        spend: uint,
        currentValue: uint
    }
)

;; Variable to track total number of investments
(define-data-var invest-counter uint u0)

;; Function to add new investment
(define-public (add-invest (amount uint) (spend uint) (current-value uint))
    (let 
        (
            (new-id (var-get invest-counter))
        )
        ;; Add investment to map
        (map-set invests new-id {
            amount: amount,
            spend: spend,
            currentValue: current-value
        })
        ;; Increment counter
        (var-set invest-counter (+ new-id u1))
        ;; Return success result
        (ok new-id)
    )
)

;; Function to get specific investment
(define-read-only (get-invest (invest-id uint))
    (map-get? invests invest-id)
)

;; Helper functions to list all investments
(define-read-only (get-invest-count)
    (var-get invest-counter)
)

;; Get investments in a specific range
;; Example: (get-invests-range u0 u5) returns first 5 investments
(define-read-only (get-invests-range (start uint) (end uint))
    (let
        (
            (max-id (var-get invest-counter))
        )
        (if (>= start max-id)
            (list) ;; Return empty list
            (fold check-and-add-invest 
                (list start (+ start u1) (+ start u2) (+ start u3) (+ start u4))
                (list)
            )
        )
    )
)

;; Helper function for fold operation
(define-private (check-and-add-invest (invest-id uint) (current-list (list 10 (optional {amount: uint, spend: uint, currentValue: uint}))))
    (match (map-get? invests invest-id)
        invest-data (unwrap-panic (as-max-len? (append current-list (some invest-data)) u10))
        current-list
    )
)

;; Calculate total investment values
(define-read-only (get-total-values)
    (let
        (
            (counter (var-get invest-counter))
        )
        {
            total-invests: counter,
            message: "Use get-invest with IDs from 0 to (total-invests - 1) to retrieve individual investments"
        }
    )
)

;; Function to update investment (optional)
(define-public (update-invest (invest-id uint) (new-amount uint) (new-spend uint) (new-current-value uint))
    (match (map-get? invests invest-id)
        existing-invest
            (begin
                (map-set invests invest-id {
                    amount: new-amount,
                    spend: new-spend,
                    currentValue: new-current-value
                })
                (ok true)
            )
        (err u404) ;; Investment not found
    )
)