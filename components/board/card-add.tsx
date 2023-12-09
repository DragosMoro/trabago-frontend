import { useCardModal } from '@/hooks/use-modal-store';
import { Column, ColumnFormatForJobAdd } from '@/lib/types'
import React from 'react'

interface CardAddProps{
  column:ColumnFormatForJobAdd;
} 

const CardAdd = ({column}:CardAddProps) => {
  const {onOpen} = useCardModal();

  return (
    <div
      role="button"
      onClick={() =>onOpen("addJob", {column})}
      className="h-[60px] w-[300px] cursor-pointer rounded-[9px] dark:bg-zinc-900 bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center text-3xl mb-4 dark:hover:bg-zinc-800 transition-all"> + </div>
  )
}

export default CardAdd