/**
 * @deprecated useGoldPrice artık kullanılmıyor.
 * Yeni hook: useHaremAltin — HaremAltin Socket.io entegrasyonu
 *
 * Bu dosya eski bağımlılıklar için uyumluluk sarmalayıcısı olarak tutulmuştur.
 */
export {
  useHaremAltin as useGoldPrice,
  formatTRY,
  formatUSD,
  formatNumber,
  formatChange,
} from "./useHaremAltin";

export type { UseHaremAltinReturn as GoldPriceData } from "./useHaremAltin";
