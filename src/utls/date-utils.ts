import { endOfMonth, format, isValid, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

export function date_dd_MMM_yyyy(date: Date) {
    return format(date, 'dd MMM, yyyy', { locale: ptBR })
}

export function date_MMMM_yyyy(date: Date) {
    return format(date, 'MMMM, yyyy', { locale: ptBR })
}

export function currentMonth(date?: Date) {    
    const today = new Date(`${format(new Date(), 'yyyy-MM-dd')}T00:00:00`) 
    const day = new Date(`${date}T00:00:00`)
    
    if (isValid(day)) {
        return {firstDay: startOfMonth(day), lastDay: endOfMonth(day)}
    } 

    return {firstDay: startOfMonth(today), lastDay: endOfMonth(today)}
}
