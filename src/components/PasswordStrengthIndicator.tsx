'use client'

import { useState, useEffect } from 'react'

interface PasswordCriteria {
  lowercase: boolean
  uppercase: boolean
  digit: boolean
  symbol: boolean
  length: boolean
}

interface PasswordStrengthIndicatorProps {
  password: string
  onValidityChange: (isValid: boolean) => void
}

export default function PasswordStrengthIndicator({ password, onValidityChange }: PasswordStrengthIndicatorProps) {
  const [criteria, setCriteria] = useState<PasswordCriteria>({
    lowercase: false,
    uppercase: false,
    digit: false,
    symbol: false,
    length: false
  })

  useEffect(() => {
    const newCriteria = {
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      length: password.length >= 8
    }
    
    setCriteria(newCriteria)
    
    const isValid = Object.values(newCriteria).every(Boolean)
    onValidityChange(isValid)
  }, [password, onValidityChange])

  const CriteriaItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
        met ? 'bg-[rgb(0,251,205)]' : 'bg-gray-300'
      }`}>
        {met && (
          <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span className={`text-sm ${met ? 'text-[rgb(0,251,205)]' : 'text-gray-400'}`}>
        {text}
      </span>
    </div>
  )

  return (
    <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Password Requirements:
      </h4>
      <div className="space-y-2">
        <CriteriaItem met={criteria.length} text="At least 8 characters" />
        <CriteriaItem met={criteria.lowercase} text="One lowercase letter" />
        <CriteriaItem met={criteria.uppercase} text="One uppercase letter" />
        <CriteriaItem met={criteria.digit} text="One number" />
        <CriteriaItem met={criteria.symbol} text="One special character" />
      </div>
    </div>
  )
}