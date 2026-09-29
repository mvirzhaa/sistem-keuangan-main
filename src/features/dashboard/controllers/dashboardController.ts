import {
  useDashboardStore,
  type DashboardData,
} from "../stores/dashboardStore";

export class DashboardController {
  private dashboardStore = useDashboardStore;

  async loadDashboardData(periode?: string) {
    await this.dashboardStore.getState().fetchDashboardData(periode);
  }

  getDashboardData(): DashboardData | null {
    return this.dashboardStore.getState().data;
  }

  isLoading(): boolean {
    return this.dashboardStore.getState().isLoading;
  }

  getError(): string | null {
    return this.dashboardStore.getState().error;
  }

  clearError() {
    this.dashboardStore.getState().clearError();
  }

  // Helper methods untuk format data
  formatCurrency(amount: number): string {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} M`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} Juta`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)} K`;
    }
    return amount.toString();
  }

  getFormattedStats() {
    const data = this.getDashboardData();
    if (!data) return null;

    return {
      totalTagihan: this.formatCurrency(data.stats.totalTagihan),
      totalTagihanLunas: this.formatCurrency(data.stats.totalTagihanLunas),
      totalPembayaran: this.formatCurrency(data.stats.totalPembayaran),
      saldoDeposit: this.formatCurrency(data.stats.saldoDeposit),
    };
  }

  reset() {
    this.dashboardStore.getState().reset();
  }
}

export const dashboardController = new DashboardController();
